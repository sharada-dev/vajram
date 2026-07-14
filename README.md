# Vajram — Antiques & Gardens

Marketing site for **Vajram Antiques & Gardens** (Bengaluru): heritage antique
spaces, organic-farm event estates, and a Thanjavur/Bali craft shop. A React
single-page app with a scroll-cinematic homepage, editorial venue and shop
pages, and a warm terracotta / parchment / brass design system.

- **Live:** https://sharada-dev.github.io/vajram/
- **Repo:** https://github.com/sharada-dev/vajram
- Auto-deploys to GitHub Pages on every push to `main`.

---

## Quick start

Requires **Node 20+** (developed on Node 24).

```bash
git clone https://github.com/sharada-dev/vajram.git
cd vajram
npm ci          # exact install from package-lock.json
npm run dev     # http://localhost:5173
```

| Script | Does |
| --- | --- |
| `npm run dev` | Vite dev server (base `/`, hot reload) |
| `npm run build` | Type-check (`tsc -b`) **and** production build → `dist/` (base `/vajram/`) |
| `npm run preview` | Serve the built `dist/` locally under `/vajram/` (mirrors the live site) |
| `npm run lint` | oxlint |

---

## Tech stack

- **React 19 + TypeScript + Vite 8** (SPA, `react-router-dom` v7)
- **Motion:** GSAP + ScrollTrigger (scroll-scrubbed pins & reveals), **Lenis**
  (smooth scroll, wired into the GSAP ticker), **Framer Motion** (coverflow,
  tilt, cursor, lamp)
- **WebGL:** `@react-three/fiber` + `three` — gold-dust hero particles
- **Map:** `d3-geo` renders `src/data/karnataka.json` (simplified GeoJSON)

`three` and `d3-geo` are **lazy-loaded** (`React.lazy`) so they land in
separate chunks and keep the main bundle small. `prefers-reduced-motion` is
honored everywhere — the animated home even swaps to the plain one.

---

## Content — the single source of truth

**`src/content.ts` holds all site copy and data:** nav, venues (with their
chapters & galleries), shop categories + products, the journal post, contact
info, the WhatsApp number, and home copy. **To change text, images, products,
or venues, edit `content.ts`** — every page renders from it.

Images live in `public/assets/` and are referenced as
`import.meta.env.BASE_URL + "assets/..."` so they resolve under the `/vajram/`
production base. (Content was originally seeded from **vajram.net** but is now
maintained independently here — the two are not synced.)

---

## Routes / pages

| Route | Page file |
| --- | --- |
| `/` | `pages/Home3D.tsx` — 5-act scroll-cinematic home + lamp intro |
| `/classic` | `pages/Home.tsx` — plain home (also served for reduced-motion & unknown routes) |
| `/life-events` | `pages/LifeEvents.tsx` |
| `/life-events/:cat/:slug` | `pages/VenueDetail.tsx` — backyard / channarayapatna / kolur |
| `/shop`, `/shop/:category`, `/shop/:category/:slug` | `Shop.tsx` / `ShopCategory.tsx` / `ShopProduct.tsx` |
| `/about` | `pages/About.tsx` |
| `/journals`, `/journals/:slug` | `Journals.tsx` / `Article.tsx` |
| `/reach-us` | `pages/ReachUs.tsx` — enquiry form + Karnataka locations map |
| `/terms`, `/privacy` | `pages/Legal.tsx` |

Shared shell is `components/Layout.tsx` (Header, Footer, custom cursor, route
curtain, grain overlay). Smooth scroll is initialized in `App.tsx` via
`lib/smooth.ts`.

---

## Motion & design architecture

- **Palette (tokens in `src/index.css`):** terracotta `#9A3E26`, parchment
  `#F4E4C8`, brass `#D89A44`, warm ink `#2A1A12`. Fonts: Cormorant Garamond
  (display), Inter (body), IBM Plex Mono (labels).
- **CSS load order (in `App.tsx`, later file wins the cascade):**
  `index.css` (tokens) → `site.css` → `design.css` → `shop.css` → `lamp.css`.
- **Shared motion hook:** `lib/motion.ts` (`usePageMotion(ref, deps)`) drives
  elements by data-attribute — `[data-reveal]`, `[data-split]` (word reveals),
  `[data-hero]`, `[data-anim]`, `[data-chapter]`, `[data-gallery]`. Pages opt
  in by tagging markup with those attributes; page-specific choreography (e.g.
  the home's pinned acts) lives in that page's own `useLayoutEffect`.
- **Notable components:** `LampGate` (pull-cord intro on the home — fires every
  page load, skippable, auto-lights after 6s, disabled for reduced-motion),
  `GoldDust`, `CoverflowGallery`, `ScatterGallery`, `LocationsMap`, `Magnetic`,
  `CountUp`, `CustomCursor`, `RouteTransition`.

### Legacy / dormant (kept intentionally, not wired to nav)
`components/three/Journey.tsx` (earlier 3D-corridor home) and the retired
palette switcher are unused; `src/assets/*` are Vite-scaffold leftovers. Safe
to delete for a cleaner tree.

---

## Deployment ⚠️ read this

- **`.github/workflows/deploy.yml`** builds and publishes to GitHub Pages on
  every push to `main` (Pages source = GitHub Actions).
- **The repo MUST stay public.** On the free plan GitHub Pages only serves
  public repos — making it private takes the live site down (404) until it's
  public again. Use GitHub Pro, or move to Netlify/Vercel, if it must be
  private.
- **Base path is `/vajram/`** in production (`vite.config.ts` sets it only for
  `build`; dev stays at `/`) because it's a *project* Pages site. The workflow
  copies `index.html` → `404.html` so deep links / refreshes work (SPA
  fallback). Moving to a root domain? Set `base: '/'`; the router `basename`
  already follows `import.meta.env.BASE_URL` automatically.

---

## Notes & constraints

- **No backend.** The Reach Us form and product "Enquire" buttons open the
  user's mail client (`mailto:`) pre-filled; there is also a WhatsApp link
  (`wa.me/9187575085`, defined in `content.ts`).
- **Shop is a gallery, not a store** — deliberately no cart, checkout, or
  prices (enquiry-led, matching the brand).
- **Strict TypeScript:** `tsconfig.app.json` sets `noUnusedLocals` /
  `noUnusedParameters`, so `npm run build` fails on unused imports/vars — keep
  it clean.
