import { useCallback, useEffect, useRef, useState } from 'react'
import type { Lang } from '../i18n/dictionary'
import { useI18n } from '../i18n/LanguageProvider'
import { VIDEO_IDS } from '../lib/config'
import { Container } from './Container'
import { LangSwitch } from './LangSwitch'

const YT_ORIGIN = 'https://www.youtube-nocookie.com'
const ACTIVATION_EVENTS = ['pointerdown', 'pointerup', 'keydown', 'touchend'] as const
// The video plays only once most of it is on screen and the visitor has
// actually scrolled to it, never because it peeks in on first load.
const PLAY_SHARE = 0.72
const MIN_SCROLL = 120

function embedUrl(id: string) {
  const p = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    playsinline: '1',
    loop: '1',
    playlist: id,
    rel: '0',
    modestbranding: '1',
    iv_load_policy: '3',
    disablekb: '1',
    fs: '0',
    cc_load_policy: '0',
    enablejsapi: '1',
    origin: window.location.origin,
  })
  return `${YT_ORIGIN}/embed/${id}?${p}`
}

// Browsers only allow sound after the visitor has tapped, clicked or typed
// somewhere on the page. Scrolling alone does not count.
function canPlaySound() {
  return navigator.userActivation?.hasBeenActive ?? false
}

// Is the stage properly in view? Share of the stage (or of the screen, for a
// stage taller than the screen) that is visible, after the visitor scrolled.
function useFocusedInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [focused, setFocused] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let entryShare = 0
    const update = () => setFocused(entryShare >= PLAY_SHARE && window.scrollY > MIN_SCROLL)
    const io = new IntersectionObserver(
      ([entry]) => {
        const visibleH = entry.intersectionRect.height
        const fullH = Math.min(entry.boundingClientRect.height, window.innerHeight)
        entryShare = fullH > 0 ? visibleH / fullH : 0
        update()
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    )
    io.observe(el)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', update)
    }
  }, [])
  return [ref, focused] as const
}

// The player loads after the page, waits on its first frame, plays when
// scrolled properly into view and pauses when scrolled away.
export function VideoSection() {
  const { t, lang } = useI18n()
  const [pick, setPick] = useState<{ site: Lang; video: Lang } | null>(null)
  const videoLang = pick && pick.site === lang ? pick.video : lang

  const [pageLoaded, setPageLoaded] = useState(() => document.readyState === 'complete')
  const [wantSound, setWantSound] = useState(true)
  const [playerMuted, setPlayerMuted] = useState(true)
  const [playing, setPlaying] = useState(false)
  // Set when the visitor presses pause; we then stop auto-playing on scroll.
  const [userPaused, setUserPaused] = useState(false)
  const [readyFor, setReadyFor] = useState<Lang | null>(null)
  const [shownFor, setShownFor] = useState<Lang | null>(null)
  const [blockedFor, setBlockedFor] = useState<Lang | null>(null)
  const ready = readyFor === videoLang
  const shown = shownFor === videoLang
  const blocked = blockedFor === videoLang

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const warmedRef = useRef(false)
  const fallbackTimer = useRef<number | undefined>(undefined)
  const [stageRef, inView] = useFocusedInView<HTMLDivElement>()
  const inViewRef = useRef(inView)
  useEffect(() => {
    inViewRef.current = inView
  }, [inView])

  useEffect(() => {
    if (pageLoaded) return
    const onLoad = () => setPageLoaded(true)
    window.addEventListener('load', onLoad, { once: true })
    return () => window.removeEventListener('load', onLoad)
  }, [pageLoaded])

  useEffect(() => () => window.clearTimeout(fallbackTimer.current), [])

  const send = useCallback((func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), YT_ORIGIN)
  }, [])

  const unmute = useCallback(() => {
    send('unMute')
    send('setVolume', [100])
  }, [send])

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== YT_ORIGIN || e.source !== iframeRef.current?.contentWindow) return
      let info
      try {
        info = JSON.parse(e.data)?.info
      } catch {
        return
      }
      if (!info) return
      if (typeof info.muted === 'boolean') setPlayerMuted(info.muted)
      if (typeof info.playerState === 'number') setPlaying(info.playerState === 1 || info.playerState === 3)
      if (info.playerState === 1 && !warmedRef.current) {
        warmedRef.current = true
        // Keep the screen plain: no captions over the picture.
        send('unloadModule', ['captions'])
        send('unloadModule', ['cc'])
        window.clearTimeout(fallbackTimer.current)
        // Warmed up off screen: hold on the opening frame until scrolled to.
        if (!inViewRef.current) {
          send('pauseVideo')
          send('seekTo', [0, true])
        }
        setShownFor(videoLang)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [videoLang, send])

  useEffect(() => {
    if (!ready) return
    if (!inView) {
      send('pauseVideo')
      return
    }
    if (userPaused) return
    send('playVideo')
    if (!wantSound) send('mute')
    else if (canPlaySound()) unmute()
  }, [inView, ready, wantSound, userPaused, send, unmute])

  useEffect(() => {
    if (!ready || !inView || !wantSound || canPlaySound()) return
    const onFirstGesture = () => unmute()
    ACTIVATION_EVENTS.forEach((ev) => window.addEventListener(ev, onFirstGesture, { once: true, capture: true }))
    return () => ACTIVATION_EVENTS.forEach((ev) => window.removeEventListener(ev, onFirstGesture, { capture: true }))
  }, [ready, inView, wantSound, unmute])

  useEffect(() => {
    if (!ready || !inView || warmedRef.current) return
    const forLang = videoLang
    fallbackTimer.current = window.setTimeout(() => {
      if (warmedRef.current) return
      setBlockedFor(forLang)
      setShownFor(forLang)
    }, 4000)
    return () => window.clearTimeout(fallbackTimer.current)
  }, [ready, inView, videoLang])

  const handleLoad = () => {
    warmedRef.current = false
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening' }), YT_ORIGIN)
    setReadyFor(videoLang)
  }

  const switchLang = (l: Lang) => {
    if (l !== videoLang) setPick({ site: lang, video: l })
  }

  const togglePlay = () => {
    if (playing) {
      setUserPaused(true)
      send('pauseVideo')
    } else {
      setUserPaused(false)
      send('playVideo')
      if (wantSound) unmute()
    }
  }

  const toggleSound = () => {
    if (playerMuted) {
      setWantSound(true)
      setUserPaused(false)
      send('playVideo')
      unmute()
    } else {
      setWantSound(false)
      send('mute')
    }
  }

  const showPausedHint = shown && !blocked && !playing && (userPaused || inView)

  return (
    <section id="video" className="py-16 sm:py-24">
      <Container>
        <div className="mb-5 flex justify-end">
          <LangSwitch value={videoLang} onChange={switchLang} label={t.video.label} />
        </div>

        <div
          ref={stageRef}
          className="group/stage relative aspect-video w-full overflow-hidden rounded-[20px] bg-[#eef0f3] shadow-[0_40px_80px_-48px_rgba(20,23,31,0.45)] ring-1 ring-line sm:rounded-[28px]"
        >
          {pageLoaded && (
            <iframe
              key={videoLang}
              ref={iframeRef}
              src={embedUrl(VIDEO_IDS[videoLang])}
              title={`GearGrid video (${t.lang[videoLang]})`}
              allow="autoplay; encrypted-media; picture-in-picture"
              onLoad={handleLoad}
              tabIndex={blocked ? 0 : -1}
              className={`absolute inset-x-0 top-[-80px] h-[calc(100%+160px)] w-full border-0 transition-opacity duration-500 ${
                shown ? 'opacity-100' : 'opacity-0'
              } ${blocked ? '' : 'pointer-events-none'}`}
            />
          )}

          {!shown && (
            <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,#eef0f3_30%,#f6f7f9_50%,#eef0f3_70%)]" />
          )}

          {!blocked && (
            <>
              {/* The whole picture plays / pauses */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? t.video.pause : t.video.play}
                className="absolute inset-0 grid cursor-pointer place-items-center"
              >
                <span
                  className={`grid h-16 w-16 place-items-center rounded-full bg-white/85 text-ink shadow-[0_18px_40px_-16px_rgba(20,23,31,0.55)] ring-1 ring-black/5 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:h-20 sm:w-20 ${
                    showPausedHint
                      ? 'scale-100 opacity-100'
                      : 'pointer-events-none scale-75 opacity-0 group-hover/stage:scale-90 group-hover/stage:opacity-70'
                  }`}
                >
                  {playing ? <PauseIcon /> : <PlayIcon />}
                </span>
              </button>

              {/* Bottom controls */}
              <div
                className={`absolute bottom-3 left-3 flex items-center gap-2 transition-all duration-500 sm:bottom-5 sm:left-5 ${
                  shown ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}
              >
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? t.video.pause : t.video.play}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-sm ring-1 ring-black/5 backdrop-blur-md transition hover:scale-105 hover:bg-white active:scale-95"
                >
                  {playing ? <PauseIcon small /> : <PlayIcon small />}
                </button>
                <SoundPill muted={playerMuted} hint={playerMuted && wantSound} label={t.video.tapForSound} onClick={toggleSound} aria={playerMuted ? t.video.sound : t.video.mute} />
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  )
}

// Sound button: when muted it softly breathes and shows "Tap for sound";
// once on, it folds into a small round button with live sound bars.
function SoundPill({ muted, hint, label, onClick, aria }: { muted: boolean; hint: boolean; label: string; onClick: () => void; aria: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={aria}
      className={`relative flex h-10 items-center rounded-full bg-white/90 pl-3 pr-3 text-[13px] font-medium text-ink shadow-sm ring-1 ring-black/5 backdrop-blur-md transition-[background-color,transform] duration-300 hover:bg-white active:scale-95 ${
        hint ? 'sound-breathe' : ''
      }`}
    >
      <span className="relative flex h-4 items-end gap-[3px]" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-[3px] rounded-full ${muted ? 'h-[5px] bg-faint' : 'sound-bar bg-brand'}`}
            style={{ animationDelay: `${i * 0.14}s` }}
          />
        ))}
        {muted && <span className="absolute left-[-2px] top-1/2 h-[1.5px] w-[19px] -translate-y-1/2 -rotate-[28deg] rounded-full bg-ink/70" />}
      </span>
      <span
        className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hint ? 'ml-2 max-w-[200px] opacity-100' : 'ml-0 max-w-0 opacity-0'
        }`}
      >
        {label}
      </span>
    </button>
  )
}

function PlayIcon({ small = false }: { small?: boolean }) {
  return (
    <svg width={small ? 12 : 20} height={small ? 14 : 22} viewBox="0 0 10 12" aria-hidden="true" className={small ? 'ml-0.5' : 'ml-1'}>
      <path d="M0 0l10 6-10 6z" fill="currentColor" />
    </svg>
  )
}

function PauseIcon({ small = false }: { small?: boolean }) {
  return (
    <svg width={small ? 12 : 18} height={small ? 14 : 20} viewBox="0 0 10 12" aria-hidden="true">
      <rect x="0.5" width="3" height="12" rx="1" fill="currentColor" />
      <rect x="6.5" width="3" height="12" rx="1" fill="currentColor" />
    </svg>
  )
}
