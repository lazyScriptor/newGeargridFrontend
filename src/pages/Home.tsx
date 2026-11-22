import { useState } from 'react'
import { Contact } from '../components/Contact'
import { FAQ } from '../components/FAQ'
import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { LaunchConsole } from '../components/LaunchConsole'
import { Pricing, type PlanId } from '../components/Pricing'
import { Showcase } from '../components/Showcase'
import { VideoSection } from '../components/VideoSection'
import { dictionaries } from '../i18n/dictionary'
import type { PageMeta } from '../seo/types'

const faqLd = (lang: 'en' | 'si') => ({
  '@type': 'FAQPage',
  mainEntity: dictionaries[lang].faq.items.map((i) => ({
    '@type': 'Question',
    name: i.q,
    acceptedAnswer: { '@type': 'Answer', text: i.a },
  })),
})

export const meta: { en: PageMeta; si: PageMeta } = {
  en: {
    title: 'GearGrid | Equipment Rental Software for Rental Shops',
    description:
      'GearGrid is equipment rental software made in Sri Lanka. See every machine, bill instantly, add late fees automatically and work from any device.',
    jsonLd: [faqLd('en')],
  },
  si: {
    title: 'GearGrid | උපකරණ කුලී මෘදුකාංගය',
    description:
      'උපකරණ සහ යන්ත්‍ර කුලියට දෙන ව්‍යාපාර සඳහා ලංකාවේ හදපු GearGrid මෘදුකාංගය. Stock එක බලන්න, එසැණින් bill එක දාන්න, late fee ස්වයංක්‍රීයව එකතු කරන්න.',
    jsonLd: [faqLd('si')],
  },
}

export default function HomePage() {
  const [plan, setPlan] = useState<PlanId | null>(null)
  return (
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
  )
}
