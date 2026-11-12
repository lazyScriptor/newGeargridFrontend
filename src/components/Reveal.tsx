import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

// Fades content up the first time it scrolls into view.
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section'
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, rootMargin: '0px 0px -10% 0px' })
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
