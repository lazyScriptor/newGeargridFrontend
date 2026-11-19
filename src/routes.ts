import type { RouteDef } from './seo/types'
import * as Home from './pages/Home'
import * as Features from './pages/Features'
import * as Pricing from './pages/Pricing'
import * as RentalSoftware from './pages/RentalSoftware'
import * as ConstructionEquipment from './pages/ConstructionEquipment'
import * as ToolHire from './pages/ToolHire'
import * as CameraRental from './pages/CameraRental'
import * as EventRental from './pages/EventRental'

export const SITE_ORIGIN = 'https://geargrid.live'

// Every public page. The prerender step writes one static HTML file per entry,
// the sitemap is generated from this list, and the client router reads it.
export const ROUTES: RouteDef[] = [
  { path: '/', lang: 'en', page: Home, alternates: { en: '/', si: '/si/' }, priority: 1.0 },
  { path: '/si/', lang: 'si', page: Home, alternates: { en: '/', si: '/si/' }, priority: 0.9 },
  { path: '/rental-management-software', lang: 'en', page: RentalSoftware, priority: 0.9 },
  { path: '/features', lang: 'en', page: Features, priority: 0.9 },
  { path: '/pricing', lang: 'en', page: Pricing, priority: 0.9 },
  { path: '/construction-equipment-rental-software', lang: 'en', page: ConstructionEquipment, priority: 0.8 },
  { path: '/tool-hire-software', lang: 'en', page: ToolHire, priority: 0.8 },
  { path: '/camera-rental-software', lang: 'en', page: CameraRental, priority: 0.8 },
  { path: '/event-rental-software', lang: 'en', page: EventRental, priority: 0.8 },
]
