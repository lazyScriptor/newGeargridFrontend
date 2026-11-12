// All visible copy lives here, in English and Sinhala.
// Keep sentences short and plain, with no technical words.

const en = {
  meta: {
    title: 'GearGrid - Machine & Equipment Rental Software Sri Lanka',
    description:
      'Rental software for machinery and equipment shops in Sri Lanka. Track every machine, bill instantly and get paid on time.',
  },
  nav: {
    how: 'How it works',
    video: 'Video',
    pricing: 'Pricing',
    faq: 'FAQ',
    signIn: 'Launch console',
    cta: 'Get started',
    menu: 'Menu',
    close: 'Close',
  },
  hero: {
    eyebrow: 'Software for machinery & equipment rental shops',
    title: ['Every machine.', 'Every bill.', 'One app.'],
    sub: 'GearGrid shows what is in your yard, bills instantly and adds late fees for you, on your phone or computer.',
    points: ['Instant billing', 'No double bookings', 'Late fees added for you'],
    primary: 'Get started',
    secondary: 'Watch the video',
    cards: {
      bill: { title: 'Bill sent on WhatsApp', value: 'Rs. 37,000' },
      late: { title: 'Late fee added', value: '+ Rs. 3,500' },
    },
  },
  video: {
    label: 'Video',
    sound: 'Turn sound on',
    mute: 'Turn sound off',
    tapForSound: 'Tap for sound',
    play: 'Play',
    pause: 'Pause',
  },
  screens: {
    title: 'Everything in one place.',
    tabs: ['Dashboard', 'Inventory', 'Orders', 'Customers', 'Equipment', 'Invoices'],
    alt: 'GearGrid screen:',
  },
  how: {
    title: 'Your whole day, in four steps.',
    steps: [
      { title: 'See your yard.', text: 'Available, out, or in repair, at a glance.' },
      { title: 'Instant billing.', text: 'Hold the ID, send the bill on WhatsApp.' },
      { title: 'Late fees, counted.', text: 'Late returns are charged automatically.' },
      { title: 'Shop in your pocket.', text: 'Track cash and returns from your phone.' },
    ],
  },
  stats: [
    { value: 'Instant', label: 'billing' },
    { value: '0', label: 'double bookings' },
    { value: '15 min', label: 'to learn' },
    { value: 'Daily', label: 'backups' },
  ],
  pricing: {
    title: 'Simple pricing.',
    sub: 'First month free on every plan. No setup fee. Cancel anytime.',
    perMonth: '/ month',
    free: 'Free',
    freeFor: 'for the 1st month',
    then: 'then',
    fromMonth2: 'from month 2',
    customAfter: 'then priced for your fleet',
    popular: 'Popular',
    custom: 'Custom',
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        blurb: 'For a single shop.',
        features: ['Up to 200 items', '3 staff accounts', 'WhatsApp & PDF bills', 'Automatic late fees'],
        cta: 'Get started',
      },
      {
        id: 'pro',
        name: 'Pro',
        blurb: 'For busy, growing shops.',
        features: ['Unlimited items', '15 staff accounts', 'Multiple locations', 'Repairs & damage tracking'],
        cta: 'Get started',
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        blurb: 'For large fleets.',
        features: ['Unlimited staff', 'Your own bill terms', 'On-site training', 'Priority support'],
        cta: 'Talk to us',
      },
    ],
  },
  faq: {
    title: 'Questions.',
    items: [
      {
        q: 'Who is GearGrid for?',
        a: 'Shops that rent out machinery, tools, generators, cameras, sound and event gear.',
      },
      {
        q: 'Is it hard to learn?',
        a: 'No. If your staff can use WhatsApp, they can use GearGrid in about 15 minutes.',
      },
      {
        q: 'Does it work on my phone?',
        a: 'Yes. It works on any phone, tablet or computer. Nothing to install.',
      },
      {
        q: 'Is my data safe?',
        a: 'Your records are private to your business and backed up every day.',
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Yes. There is no setup fee and no long contract.',
      },
    ],
  },
  contact: {
    title: 'Let’s get you set up.',
    sub: 'Leave your details and we will call you back.',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    company: 'Business name',
    plan: 'Plan',
    message: 'Message',
    messageDefault: (plan: string) => `I'd like to start with the ${plan} plan.`,
    messagePlaceholder: 'Tell us a little about your shop',
    submit: 'Send',
    sending: 'Sending…',
    success: 'Thank you. We will be in touch shortly.',
    error: 'Something went wrong. Please try WhatsApp instead.',
    whatsapp: 'WhatsApp us',
    or: 'or',
  },
  launch: {
    eyebrow: 'Already using GearGrid?',
    title: 'Your console is one click away.',
    cta: 'Launch console',
  },
  footer: {
    rights: 'All rights reserved.',
    made: 'Made in Sri Lanka',
  },
  lang: { en: 'English', si: 'සිංහල' },
}

export type Dict = typeof en

const si: Dict = {
  meta: {
    title: 'GearGrid | ඔබේ Rental ව්‍යාපාරය, දැන් ලේසියි',
    description:
      'Machinery සහ උපකරණ කුලියට දෙන ව්‍යාපාර වලට. Stock එක බලන්න, එසැණින් bill එක දාන්න, හරියට සල්ලි ගන්න.',
  },
  nav: {
    how: 'වැඩ කරන හැටි',
    video: 'වීඩියෝ',
    pricing: 'මිල',
    faq: 'ප්‍රශ්න',
    signIn: 'Console එකට',
    cta: 'පටන් ගන්න',
    menu: 'Menu',
    close: 'වහන්න',
  },
  hero: {
    eyebrow: 'Machinery සහ උපකරණ කුලියට දෙන ව්‍යාපාර වලට',
    title: ['හැම machine එකක්ම.', 'හැම bill එකක්ම.', 'එකම app එකක.'],
    sub: 'Stock එකේ මොනවද තියෙන්නේ කියලා බලන්න, එසැණින් bill එක දාන්න, පරක්කු ගාස්තු ඉබේම එකතු වෙනවා. Phone එකෙන් හරි computer එකෙන් හරි.',
    points: ['Instant billing', 'Double booking නෑ', 'පරක්කු ගාස්තු ඉබේම'],
    primary: 'පටන් ගන්න',
    secondary: 'වීඩියෝ එක බලන්න',
    cards: {
      bill: { title: 'Bill එක WhatsApp කළා', value: 'Rs. 37,000' },
      late: { title: 'පරක්කු ගාස්තුව එකතු කළා', value: '+ Rs. 3,500' },
    },
  },
  video: {
    label: 'වීඩියෝ',
    sound: 'Sound on කරන්න',
    mute: 'Sound off කරන්න',
    tapForSound: 'Sound එකට tap කරන්න',
    play: 'Play',
    pause: 'Pause',
  },
  screens: {
    title: 'ඔක්කොම එක තැනක.',
    tabs: ['Dashboard', 'Stock', 'Orders', 'Customers', 'Equipment', 'Invoices'],
    alt: 'GearGrid screen:',
  },
  how: {
    title: 'ඔබේ මුළු දවසම, පියවර 4කින්.',
    steps: [
      { title: 'Stock එක එක බැල්මෙන්.', text: 'තියෙන ඒවා, කුලියට ගිය ඒවා, repair වල තියෙන ඒවා, ඔක්කොම එක තැනක.' },
      { title: 'Instant billing.', text: 'ID එක තියාගෙන, bill එක WhatsApp කරන්න.' },
      { title: 'පරක්කු ගාස්තු ඉබේම.', text: 'පරක්කු වෙලා ගෙනාවොත්, ගාස්තුව bill එකට ඉබේම එකතු වෙනවා.' },
      { title: 'කඩේ ඔබේ අතේ.', text: 'සල්ලි, ආපහු ආපු බඩු, ඔක්කොම phone එකෙන් බලන්න.' },
    ],
  },
  stats: [
    { value: 'Instant', label: 'Billing' },
    { value: '0', label: 'Double booking' },
    { value: 'විනාඩි 15', label: 'පුරුදු වෙන්න' },
    { value: 'හැමදාම', label: 'Backup වෙනවා' },
  ],
  pricing: {
    title: 'සරල මිල.',
    sub: 'හැම plan එකකම පළමු මාසය නොමිලේ. Setup ගාස්තු නෑ. ඕන වෙලාවක නවත්වන්න පුළුවන්.',
    perMonth: '/ මාසෙට',
    free: 'නොමිලේ',
    freeFor: 'පළමු මාසය',
    then: 'ඊට පස්සේ',
    fromMonth2: '2 වන මාසයේ සිට',
    customAfter: 'ඊට පස්සේ ඔබේ fleet එකට ගැලපෙන මිලක්',
    popular: 'ගොඩක් අය ගන්නේ',
    custom: 'කතා කරලා',
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        blurb: 'එක කඩයකට.',
        features: ['බඩු 200 දක්වා', 'Staff accounts 3', 'WhatsApp / PDF bills', 'පරක්කු ගාස්තු ඉබේම'],
        cta: 'පටන් ගන්න',
      },
      {
        id: 'pro',
        name: 'Pro',
        blurb: 'වැඩ වැඩි, ලොකු වෙන ව්‍යාපාර වලට.',
        features: ['බඩු ඕන තරම්', 'Staff accounts 15', 'Branches කීපයක්', 'Repair සහ damage තොරතුරු'],
        cta: 'පටන් ගන්න',
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        blurb: 'ලොකු machine fleet තියෙන අයට.',
        features: ['Staff ඕන තරම්', 'ඔබේම bill කොන්දේසි', 'ඔබේ තැනටම ඇවිත් training', 'ඉක්මන් support'],
        cta: 'අපිත් එක්ක කතා කරන්න',
      },
    ],
  },
  faq: {
    title: 'ප්‍රශ්න.',
    items: [
      {
        q: 'GearGrid කාටද?',
        a: 'Machinery, tools, generators, කැමරා, sound, event බඩු කුලියට දෙන ඕනම ව්‍යාපාරයකට.',
      },
      {
        q: 'ඉගෙන ගන්න අමාරුද?',
        a: 'නෑ. WhatsApp පාවිච්චි කරන්න පුළුවන් කෙනෙක්ට විනාඩි 15න් පුරුදු වෙන්න පුළුවන්.',
      },
      {
        q: 'Phone එකෙන් වැඩ කරනවද?',
        a: 'ඔව්. ඕනම phone, tablet, computer එකකින් වැඩ. මුකුත් install කරන්න ඕන නෑ.',
      },
      {
        q: 'මගේ data ආරක්ෂිතද?',
        a: 'ඔබේ තොරතුරු බලන්න පුළුවන් ඔබට විතරයි. හැමදාම backup වෙනවා.',
      },
      {
        q: 'ඕන වෙලාවක නවත්වන්න පුළුවන්ද?',
        a: 'ඔව්. Setup ගාස්තුවක්වත් දිගු contract එකක්වත් නෑ.',
      },
    ],
  },
  contact: {
    title: 'අපි setup කරලා දෙන්නම්.',
    sub: 'ඔබේ විස්තර දාන්න, අපි call කරන්නම්.',
    name: 'නම',
    email: 'Email',
    phone: 'Phone අංකය',
    company: 'ව්‍යාපාරයේ නම',
    plan: 'Plan එක',
    message: 'පණිවිඩය',
    messageDefault: (plan: string) => `මට ${plan} plan එකෙන් පටන් ගන්න ඕන.`,
    messagePlaceholder: 'ඔබේ ව්‍යාපාරය ගැන පොඩ්ඩක් කියන්න',
    submit: 'යවන්න',
    sending: 'යවනවා…',
    success: 'ස්තූතියි! අපි ඉක්මනින්ම කතා කරන්නම්.',
    error: 'මොකක් හරි වැරදුණා. WhatsApp එකෙන් අපිට කතා කරන්න.',
    whatsapp: 'WhatsApp කරන්න',
    or: 'නැත්නම්',
  },
  launch: {
    eyebrow: 'දැනටමත් GearGrid පාවිච්චි කරනවද?',
    title: 'ඔබේ console එකට එක click එකයි.',
    cta: 'Console එක open කරන්න',
  },
  footer: {
    rights: 'සියලු හිමිකම් ඇවිරිණි.',
    made: 'ලංකාවේ හැදුවා',
  },
  lang: { en: 'English', si: 'සිංහල' },
}

export const dictionaries = { en, si }
export type Lang = keyof typeof dictionaries
