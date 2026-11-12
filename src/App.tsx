import { useState } from 'react'
import { Ambient } from './components/Ambient'
import { Contact } from './components/Contact'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { LaunchConsole } from './components/LaunchConsole'
import { Nav } from './components/Nav'
import { Pricing, type PlanId } from './components/Pricing'
import { Showcase } from './components/Showcase'
import { VideoSection } from './components/VideoSection'

export default function App() {
  const [plan, setPlan] = useState<PlanId | null>(null)
  return (
    <>
      <Ambient />
      <Nav />
      <main>
        <Hero />
        <VideoSection />
        <Showcase />
        <HowItWorks />
        <Pricing onChoose={setPlan} />
        <FAQ />
        <Contact plan={plan} />
        <LaunchConsole />
      </main>
      <Footer />
    </>
  )
}
