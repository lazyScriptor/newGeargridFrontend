import { useCallback, useEffect, useRef, useState } from 'react'
import type { Lang } from '../i18n/dictionary'
import { useI18n } from '../i18n/LanguageProvider'
import { VIDEO_IDS } from '../lib/config'
import { useInView } from '../hooks/useInView'
import { Container } from './Container'
import { LangSwitch } from './LangSwitch'

const YT_ORIGIN = 'https://www.youtube-nocookie.com'
const ACTIVATION_EVENTS = ['pointerdown', 'pointerup', 'keydown', 'touchend'] as const

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

// The player loads as soon as the page has loaded, warms up off screen and
// waits on its first frame. It plays when scrolled into view (with sound as
// soon as the browser allows it) and pauses when scrolled away.
export function VideoSection() {
  const { t, lang } = useI18n()
  // The visitor's pick on the video applies until the site language changes.
  const [pick, setPick] = useState<{ site: Lang; video: Lang } | null>(null)
  const videoLang = pick && pick.site === lang ? pick.video : lang

  const [pageLoaded, setPageLoaded] = useState(() => document.readyState === 'complete')
  const [wantSound, setWantSound] = useState(true)
  const [playerMuted, setPlayerMuted] = useState(true)
  // Each flag records which language's player it belongs to, so a newly
  // switched player starts hidden until its first frame is ready.
  const [readyFor, setReadyFor] = useState<Lang | null>(null)
  const [shownFor, setShownFor] = useState<Lang | null>(null)
  const [blockedFor, setBlockedFor] = useState<Lang | null>(null)
  const ready = readyFor === videoLang
  const shown = shownFor === videoLang
  const blocked = blockedFor === videoLang

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const warmedRef = useRef(false)
  const fallbackTimer = useRef<number | undefined>(undefined)
  const [stageRef, inView] = useInView<HTMLDivElement>({ threshold: 0.5 })
  const inViewRef = useRef(inView)
  useEffect(() => {
    inViewRef.current = inView
  }, [inView])

  // Start loading the player right after the page itself has loaded.
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

  // Listen to the player: is it muted, and has it shown its first frame?
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
      if (info.playerState === 1 && !warmedRef.current) {
        warmedRef.current = true
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

  // Play while visible (with sound when allowed), pause when scrolled away.
  useEffect(() => {
    if (!ready) return
    if (!inView) {
      send('pauseVideo')
      return
    }
    send('playVideo')
    if (!wantSound) send('mute')
    else if (canPlaySound()) unmute()
  }, [inView, ready, wantSound, send, unmute])

  // If the browser refuses to start it while it is on screen (e.g. battery
  // saver), show the player as-is so a tap on it starts playback.
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

  // No tap yet: turn the sound on with the visitor's first tap or key press.
  useEffect(() => {
    if (!ready || !inView || !wantSound || canPlaySound()) return
    const onFirstGesture = () => unmute()
    ACTIVATION_EVENTS.forEach((ev) => window.addEventListener(ev, onFirstGesture, { once: true, capture: true }))
    return () => ACTIVATION_EVENTS.forEach((ev) => window.removeEventListener(ev, onFirstGesture, { capture: true }))
  }, [ready, inView, wantSound, unmute])

  const handleLoad = () => {
    warmedRef.current = false
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening' }), YT_ORIGIN)
    setReadyFor(videoLang)
  }

  const switchLang = (l: Lang) => {
    if (l !== videoLang) setPick({ site: lang, video: l })
  }

  const toggleSound = () => {
    if (playerMuted) {
      setWantSound(true)
      send('playVideo')
      unmute()
    } else {
      setWantSound(false)
      send('mute')
    }
  }

  return (
    <section id="video" className="py-16 sm:py-24">
      <Container>
        <div className="mb-5 flex justify-end">
          <LangSwitch value={videoLang} onChange={switchLang} label={t.video.label} />
        </div>

        <div
          ref={stageRef}
          className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-[#eef0f3] ring-1 ring-line sm:rounded-[28px]"
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
              // Taller than the stage, so YouTube's title bar and logo sit
              // in the cropped strips above and below the picture.
              className={`absolute inset-x-0 top-[-80px] h-[calc(100%+160px)] w-full border-0 transition-opacity duration-500 ${
                shown ? 'opacity-100' : 'opacity-0'
              } ${blocked ? '' : 'pointer-events-none'}`}
            />
          )}

          {/* Soft loading shimmer until the first frame is ready */}
          {!shown && (
            <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,#eef0f3_30%,#f6f7f9_50%,#eef0f3_70%)]" />
          )}

          {!blocked && (
            <button
              type="button"
              onClick={toggleSound}
              aria-label={playerMuted ? t.video.sound : t.video.mute}
              className="group absolute inset-0 flex items-end justify-start p-3 sm:p-5"
            >
              <span
                className={`inline-flex h-10 items-center gap-2 rounded-full bg-white/90 px-3 text-[13px] font-medium text-ink shadow-sm ring-1 ring-black/5 backdrop-blur transition duration-300 group-hover:bg-white ${
                  shown ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <SoundIcon muted={playerMuted} />
                {playerMuted && wantSound && <span className="pr-1">{t.video.tapForSound}</span>}
              </span>
            </button>
          )}
        </div>
      </Container>
    </section>
  )
}

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" stroke="none" />
      {muted ? <path d="m16 9 5 6m0-6-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
    </svg>
  )
}
