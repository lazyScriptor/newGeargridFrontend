export const APP_URL = import.meta.env.DEV ? 'http://localhost:5173' : 'https://app.geargrid.live'
export const SIGN_IN_URL = `${APP_URL}/login`

// geargrid.live/api is not proxied (it answers 405), so post straight to the API host.
export const API_BASE: string =
  import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:8086/api' : 'https://api.geargrid.live/api')

export const PHONE_DISPLAY = '+94 77 772 2295'
export const WHATSAPP_URL = 'https://wa.me/94777722295'
export const EMAIL = 'contact@geargrid.live'

export const VIDEO_IDS = { en: 'd8zgXvWh2dY', si: 'AYMDWEm_sWo' } as const

export const PRICES = {
  LKR: { starter: 'Rs. 5,900', pro: 'Rs. 9,900' },
  USD: { starter: '$19', pro: '$39' },
} as const
export type Currency = keyof typeof PRICES
