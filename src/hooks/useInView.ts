import { useEffect, useRef, useState } from 'react'

// Tracks whether an element is on screen. `once` stops watching after the
// first time it appears (used for reveal-on-scroll).
export function useInView<T extends Element>(options: IntersectionObserverInit & { once?: boolean } = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const [seen, setSeen] = useState(false)
  const { once = false, root = null, rootMargin = '0px', threshold = 0 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setSeen(true)
        if (entry.isIntersecting && once) io.disconnect()
      },
      { root, rootMargin, threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once, root, rootMargin, threshold])

  // `seen` stays true once the element has been on screen.
  return [ref, inView, seen] as const
}
