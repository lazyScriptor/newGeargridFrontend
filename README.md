# GearGrid landing page

Vite + React 19 + TypeScript + Tailwind v4. A single page that is white, minimal and uses the amber brand colour, with English and Sinhala versions.

## Sections
Hero (3D tile grid) → Video → How it works → Pricing → FAQ → Contact → Footer

| File | What |
|---|---|
| `src/i18n/dictionary.ts` | All copy, English + Sinhala |
| `src/i18n/LanguageProvider.tsx` | Picks the language in this order: `?lang=` link, saved choice, then country (Sri Lanka gets Sinhala) |
| `src/lib/geo.ts` | Detects Sri Lanka in the browser (time zone / locale), with no network call |
| `src/lib/config.ts` | Video IDs, prices, phone, WhatsApp, API base |
| `src/components/HeroGrid.tsx` | three.js grid. Lazy-loaded and paused when off screen |
| `src/components/LaunchConsole.tsx` + `ConsoleScene.tsx` | Launch console band with a three.js tile wave, linking to app.geargrid.live |
| `src/components/VideoSection.tsx` | Starts muted when scrolled into view and pauses when scrolled away. Has a language switch and a sound button |

The contact form posts to `https://api.geargrid.live/api/contact/inquiry` (override with `VITE_API_URL`).

Pushing to `main` deploys: `.github/workflows/deploy-landing.yml` builds and rsyncs `dist/` to the server behind geargrid.live.

```bash
npm run dev     # dev server
npm run build   # typecheck + production build
npm run lint
```
