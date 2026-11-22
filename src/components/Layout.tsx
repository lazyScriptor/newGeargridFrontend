import type { ReactNode } from 'react'
import { Ambient } from './Ambient'
import { Footer } from './Footer'
import { Nav } from './Nav'

// Shared frame: the soft background, the nav, the page's <main>, the footer.
export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Ambient />
      <Nav />
      {children}
      <Footer />
    </>
  )
}
