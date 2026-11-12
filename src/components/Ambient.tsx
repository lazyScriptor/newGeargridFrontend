import { useEffect, useRef } from 'react'

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

// A fixed, page-wide layer behind everything: soft warm light that drifts
// slowly and follows the scroll, two thin flowing lines, and a faint paper
// grain. It breaks up the white without adding anything to read.
export function Ambient() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      el.style.setProperty('--p', String(max > 0 ? window.scrollY / max : 0))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden [--p:0]">
      {/* Warm light, moving from top-right toward the left as you scroll */}
      <div className="absolute inset-0 [transform:translate3d(calc(var(--p)*-38vw),calc(var(--p)*22vh),0)] will-change-transform">
        <div className="amb-a absolute -right-[18vmax] -top-[22vmax] h-[78vmax] w-[78vmax] rounded-full bg-[radial-gradient(circle,rgba(245,166,35,0.16)_0%,rgba(245,166,35,0.06)_38%,rgba(245,166,35,0)_66%)]" />
      </div>
      <div className="absolute inset-0 [transform:translate3d(calc(var(--p)*30vw),calc(var(--p)*-18vh),0)] will-change-transform">
        <div className="amb-b absolute -left-[26vmax] top-[34vh] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(236,214,180,0.32)_0%,rgba(236,214,180,0.1)_40%,rgba(236,214,180,0)_68%)]" />
      </div>
      <div className="amb-c absolute -bottom-[34vmax] right-[8vw] h-[64vmax] w-[64vmax] rounded-full bg-[radial-gradient(circle,rgba(203,208,218,0.32)_0%,rgba(203,208,218,0)_64%)]" />

      {/* Two thin lines flowing across the page */}
      <svg
        className="absolute inset-0 h-full w-full [transform:translate3d(0,calc(var(--p)*-12vh),0)]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path d="M-80 640 C 260 480, 520 820, 860 600 S 1340 300, 1540 420" stroke="rgba(20,23,31,0.07)" strokeWidth="1.2" />
        <path className="amb-line" d="M-80 640 C 260 480, 520 820, 860 600 S 1340 300, 1540 420" stroke="rgba(245,166,35,0.55)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M-60 210 C 300 120, 560 360, 900 250 S 1300 80, 1520 160" stroke="rgba(20,23,31,0.05)" strokeWidth="1" />
        <path className="amb-line [animation-delay:-19s]" d="M-60 210 C 300 120, 560 360, 900 250 S 1300 80, 1520 160" stroke="rgba(20,23,31,0.22)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>

      {/* Paper grain */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply" style={{ backgroundImage: GRAIN }} />
    </div>
  )
}
