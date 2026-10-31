# Theories Consulting — Website Development Guide

> **Purpose:** Single source of truth for converting the Theories Figma design into a production website.  
> **Audience:** UI/UX developers, frontend engineers, and anyone implementing or reviewing pages.  
> **Figma file:** [Theories](https://www.figma.com/design/pHVJiOJHiE2M83ZnSWWoD2/Theories?node-id=1720-4223)  
> **Canonical frame:** **Home final** (`1720:4223`) — use this frame, not older drafts (`Home 1`, `Home 2`, earlier `Home final`).

---

## ⚠️ Primary objective — same look & feel from 15″ to 24″ screens

The Figma is authored at **1920px**. The live site must look **proportionally identical** on:

| Device class | Typical CSS width | Expectation |
|--------------|-------------------|-------------|
| 15″ laptop | ~1366–1440px | Same layout, scaled down fluidly |
| 16–17″ laptop | ~1512–1680px | Same layout, mid-scale |
| 24″ monitor | ~1920px | Exact Figma match (cap) |

**How we achieve this:** every size (type, images, gaps, radii, button heights) uses `clamp()` with a `vw` middle term. There is **no body zoom hack** and **no stepped breakpoint font sizes** on the desktop range.

**Where this section conflicts with later Figma-derived tables, THIS SECTION WINS.**

### D1. Fluid sizing system (non-negotiable)

```
Figma px → clamp(min, N / 19.2 vw, Npx)
```

Example: Figma `80px` → `clamp(3.5rem, 4.167vw, 5rem)` (56 → 80px).

- At **1920px**: sizes hit their **max** (exact Figma).
- At **1440px**: sizes are ~75% of Figma (still the same composition).
- At **1366px**: sizes are ~71% of Figma.
- Above **1920px**: layout is centered in `max-w-[1920px]`; sizes stay capped — do not grow past Figma.

`body` only needs `min-width: 320px`. Never set a fixed `1920px` width on `body`.

**Rule: never use stepped breakpoint sizes for sizing** (`md:text-[56px] 2xl:text-[64px]`). Breakpoints (`sm` / `lg` / `xl`) are only for **layout changes** (column counts, show/hide, stack vs row) — never for scaling type, spacing, or image dimensions on the 15″–24″ range.

### D2. Fluid type utilities (define once, reuse everywhere)

Map every Figma text style to a named utility. Do not invent one-off `text-[Npx]` in components.

| Utility | Clamp value | Range (approx) | Figma source (1920) |
|---------|-------------|----------------|---------------------|
| `text-display` | `clamp(3.5rem, 4.167vw, 5rem)` | 56 → 80px | Hero H1 — Power Grotesk 80 |
| `text-h2` | `clamp(2.5rem, 3.33vw, 4rem)` | 40 → 64px | Section titles — Power Grotesk 64 |
| `text-h3` | `clamp(1.75rem, 2.29vw, 2.75rem)` | 28 → 44px | Project titles — Power Grotesk 44 |
| `text-h4` | `clamp(1.5rem, 2.08vw, 2.5rem)` | 24 → 40px | Service row / social — Power Grotesk 40 |
| `text-stat` | `clamp(3.75rem, 5.21vw, 6.25rem)` | 60 → 100px | Hero stats — Power Grotesk 100 |
| `text-nav` | `clamp(0.935rem, 1.25vw, 1.5rem)` | ~15 → 24px | Header links — **Poppins Bold** |
| `text-cta` | `clamp(0.875rem, 1.04vw, 1.25rem)` | 14 → 20px | Buttons — **Poppins Regular** |
| `text-tag` | `clamp(0.8125rem, 0.94vw, 1.125rem)` | 13 → 18px | Service tags — **Poppins Bold** (Projects pills use custom sizes below) |
| `text-body` | `clamp(0.875rem, 1.15vw, 1.375rem)` | 14 → 22px | Descriptions — **Poppins Regular** |
| `text-body-sm` | `clamp(0.75rem, 0.8854vw, 17px)` | 12 → **17px** | Hero sub + **Projects descriptions** — **Poppins Regular** |
| `text-label` | `clamp(0.8125rem, 0.94vw, 1.125rem)` | 13 → 18px | Labels — **Poppins Regular** `#686868` |

#### Projects section type (shipped overrides — `Projects.tsx`)

Breakpoints: mobile = `max-md` (&lt;768px); tablet = `md`–`max-lg` (768–1023px); desktop = `lg+`.

| Element | Utility / class | Desktop (`lg+`) | Tablet (`md`–`lg`) | Mobile (`max-md`) | Weight / font |
|---------|-----------------|-----------------|--------------------|-------------------|---------------|
| Section H2 (“Explore how…”) | `text-h2` + `max-md:!text-[38px] md:max-lg:!text-[2.625rem]` | Fluid → **64px** | **42px** locked | **38px** locked | Power Grotesk Regular |
| Project title | `text-h3` + `max-lg:!text-[1.75rem]` | Fluid → **44px** | **28px** locked | **28px** locked | Power Grotesk Regular |
| Description | `text-body-sm` + `font-normal` | Fluid → **17px** | Fluid (same clamp; min **12px**) | Fluid (same clamp; min **12px**) | Poppins Regular |
| Tag pill (e.g. UI/UX Design) | custom clamp + `max-lg:!text-[10px]` | Fluid → **18px** | **10px** locked | **10px** locked | Poppins Regular (not Bold) |

**Do not** use `text-tag` (Bold) for Projects pills — Figma + product decision: Regular only.

### D3. Fluid layout / spacing / media clamps

| Item | Clamp (max = Figma @ 1920) |
|------|----------------------------|
| Page gutter | `px-[clamp(1.25rem, 6.25vw, 7.5rem)]` → 20 → 120px |
| Container | `mx-auto w-full max-w-[1920px]` + gutter above |
| Header pill height | `h-[clamp(56px, 4.375vw, 84px)]` |
| Header pill width | `w-[clamp(920px, 72.7vw, 1396px)]` (or `max-w` + horizontal inset) |
| Header top offset | `top-[clamp(12px, 1.56vw, 30px)]` |
| Button height | `h-[clamp(44px, 3.07vw, 59px)]` |
| Tag chip height | `h-[clamp(40px, 2.97vw, 57px)]` |
| Project card image (half) | `w-[clamp(480px, 42.45vw, 815px)]` + `aspect-[815/726]` |
| Project wide image | `w-[clamp(840px, 73.125vw, 1404px)]` + `aspect-[1404/767]` |
| Featured card | `w-[clamp(240px, 20.21vw, 388px)]` |
| Service icon | `size-[clamp(40px, 3.125vw, 60px)]` |
| Logo wordmark (header) | `h-[clamp(16px, 1.31vw, 25px)]` w-auto |
| Showreel block height | `h-[clamp(420px, 38.02vw, 730px)]` |

**Images and videos** must scale with the same `vw` / `%` / `aspect-*` rules — never hard-code only desktop pixel widths without a fluid width.

### D4. Intentional line breaks

Preserve Figma line breaks on ≥sm; let text flow on small screens:

| Location | Break after |
|----------|-------------|
| Hero H1 | `Every business is built` / `on a theory.` |
| Hero subtitle | `…and evolve it.` / `Together, we…` |
| Agency hero H1 | `Driving startup growth` / `crafting your brand with precision & impact` |
| Mediverse CTA | `Creative for every business.` / `Growth engineered for healthcare.` |
| Testimonials H2 | `Delivering service excellence` / `our clients depend on` |
| Projects description | `…strategic brand` / `thinking with…` — **desktop only** (`hidden lg:block`) |

Pattern: `<br className="hidden sm:block" />` (Hero). Projects description: `<br className="hidden lg:block" />`.

### D5. Header conventions

- **Fixed** glass pill: `fixed` + centered, `z-50`.
- Background: `rgba(255,255,255,0.1)` + `backdrop-blur` + `border: 0.5px solid white` + `border-radius: 42px` (fluid: `rounded-[clamp(28px,2.19vw,42px)]`).
- Nav: Projects · Services · Agency (**Poppins Bold**).
- Right cluster: outline “Work with us” + gradient “Business Design” CTA (see Button).
- Below `lg`: collapse links into hamburger; keep primary gradient CTA visible.

### D6. Motion defaults

- Logo / partner marquees: continuous `translateX` track, pause on hover, `prefers-reduced-motion: reduce` disables.
- Testimonial carousel: vertical or horizontal with arrows; pause on hover.
- Buttons / links: global `150ms ease` transition — do not re-declare per element.
- Page load: soft fade on hero text only.

---

## 1. Project summary

Theories Consulting is a branding and advertising consultancy site: dark editorial hero, orange gradient accents, large Power Grotesk display type, project case studies, services list, testimonials, and a Mediverse healthcare CTA.

| Item | Value |
|------|--------|
| Brand | Theories Consulting |
| Design canvas | Desktop `1920 × 13329` (`Home final`) |
| Content width | `1680px` (side inset `120px`) |
| Primary accent | Orange gradient `#FE4A01 → #FEBA07` |
| Display / titles | **Power Grotesk** (`public/fonts/PowerGrotesk-Regular.ttf`) |
| Nav / CTA / highlight | **Poppins Bold** (`public/fonts/Poppins-Bold.ttf`) |
| Body / description | **Poppins Regular** (`public/fonts/Poppins-Regular.ttf`) |
| Contact email | `theoriesconsulting@gmail.com` |
| Phone | `+91 9912983515` |

---

## 2. Figma source of truth

### 2.1 Which frames to build

Build only from **Home final** (`1720:4223`). Ignore older explorations on the same canvas (`Home 1`, `Home 2`, earlier shorter `Home final`, hidden frames).

| Page | Figma frame | Node ID | Desktop size | Route |
|------|-------------|---------|--------------|-------|
| Home | `Home final` | `1720:4223` | `1920 × 13329` | `/` |
| Projects | *(derive from Home projects + “View all”)* | — | TBD when designed | `/projects` |
| Services | *(derive from Home services block)* | — | TBD | `/services` |
| Agency (About) | About hero group | `1892:2101` | `1920 × 1109` (hero) | `/agency` |
| Contact / Work with us | *(TBD)* | — | TBD | `/contact` |

Until inner-page frames exist, reuse Home tokens, header, and footer.

### 2.2 How to use Figma while coding

1. Open Dev Mode on `Home final`.
2. Measure spacing from the **120px** left/right gutter — convert to fluid clamps, not absolute canvas X.
3. Export photos at **2×**; logos/icons as **SVG** when possible.
4. Rebuild with flex/grid + tokens — **do not** paste Figma absolute-position output into production.
5. Fix obvious Figma copy issues in code only when marketing approves (placeholder project blurbs still say “MOHA” in several cards).

### 2.3 Known design gaps

| Gap | Recommendation |
|-----|----------------|
| No mobile / tablet frames | Use Section 8 layout breakpoints; keep fluid type/spacing |
| No Projects / Services pages (full) | Shell routes + reuse Home patterns; Agency hero shipped |
| No Agency sections below hero | Hero-only from `1892:2101` until more frames exist |
| Duplicate / placeholder project copy | Replace with real case copy before launch |
| Hover / focus states incomplete | Use Section 6 defaults |
| Power Grotesk licensing | Self-host licensed files; never ship unlicensed trial fonts |

---

## 3. Recommended tech stack

| Layer | Recommendation | Why |
|-------|----------------|-----|
| Framework | **Next.js (App Router) + TypeScript** | SEO, Image, routing |
| Styling | **Tailwind v4** + CSS variables / `@utility` fluid type | Matches clamp workflow |
| Animation | CSS keyframes + light Framer Motion | Marquees, carousels |
| Forms | React Hook Form + Zod | Contact / “Work with us” |
| Hosting | Vercel / Netlify | Static + SSR |

---

## 4. Design tokens

Store in `src/styles/tokens.css` (or Tailwind `@theme`).

### 4.1 Color

```css
:root {
  /* Brand gradient */
  --color-orange-start: #FE4A01;
  --color-orange-end: #FEBA07;
  --gradient-brand: linear-gradient(90deg, #FE4A01 0%, #FEBA07 100%);

  /* Neutrals */
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-text: #000000;
  --color-text-muted: #686868;
  --color-text-on-dark-muted: rgba(255, 255, 255, 0.6);

  /* Surfaces */
  --color-bg: #000000;           /* home is predominantly dark */
  --color-bg-light: #FFFFFF;     /* project / light bands if needed */
  --color-nav-glass: rgba(255, 255, 255, 0.1);
  --color-border-glass: rgba(255, 255, 255, 1);

  /* Semantic */
  --color-focus: #FE4A01;
  --color-error: #D64545;
  --color-success: #1F9D55;
}
```

**Usage rules**

- Gradient = primary filled CTAs (“Business Design”, filled pills).
- Outline white pills on dark = secondary CTAs (“Work with us”, “Cup of tea?”, “Let’s Begin” variants as designed).
- Muted labels = `#686868` on dark/light as in Figma; hero supporting copy = `rgba(255,255,255,0.6)`.

### 4.2 Typography (raw Figma @ 1920)

> In code, always use the fluid utilities in **D2** — never hard-code these px values except as clamp maxima.

| Role | Font | Weight | Size @ 1920 | Color | Use |
|------|------|--------|-------------|-------|-----|
| Display / H1 | Power Grotesk | Regular | `80px` | white | Hero |
| Section H2 | Power Grotesk | Regular | `64px` | black / white | Projects, Services, Featured, Mediverse |
| Project title | Power Grotesk | Regular | `44px` | black | Case study names |
| Service / social title | Power Grotesk | Regular | `40px` | white | Service rows, footer social |
| Stat number | Power Grotesk | Regular | `100px` | white | 30+ / 25+ / 300+ / 20+ |
| Nav | Poppins | Bold (700) | `24px` | white | Header links |
| Button / CTA | Poppins | Bold (700) | `20px` | white | Pill buttons |
| Tag | Poppins | Bold (700) | `18px` | black | Service chips |
| Body | Poppins | Regular | `22px` | white / black | Descriptions, footer values |
| Small body / quote | Poppins | Regular | `17px` | muted / black | Hero sub, **Projects descriptions**, testimonials, stat labels |
| Footer label | Poppins | Regular | `18px` | `#686868` | “Say Hello!”, “Contact us” |

**Local font loading** (`public/fonts/`)

```css
@font-face {
  font-family: "Power Grotesk";
  src: url("/fonts/PowerGrotesk-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Poppins";
  src: url("/fonts/Poppins-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Poppins";
  src: url("/fonts/Poppins-Bold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

:root {
  --font-display: "Power Grotesk", system-ui, sans-serif;
  --font-body: "Poppins", system-ui, sans-serif;
  --font-highlight: "Poppins", system-ui, sans-serif;
}
```
### 4.3 Spacing scale (Figma maxima)

| Token | Value | Common use |
|-------|-------|------------|
| `--space-1` | `4px` | Micro |
| `--space-2` | `8px` | Tight |
| `--space-3` | `12px` | Compact |
| `--space-4` | `16px` | Card internal |
| `--space-5` | `24px` | Related blocks |
| `--space-6` | `32px` | Sub-gaps |
| `--space-7` | `40px` | Card grids |
| `--space-8` | `48px` | Medium pad |
| `--space-9` | `64px` | Large pad |
| `--space-10` | `80px` | Hero rhythm |
| `--space-11` | `120px` | **Page gutter** |

Use these as clamp **max** values; never as fixed desktop-only padding for the 15″–24″ band.

### 4.4 Layout

```css
:root {
  --page-max: 1920px;
  --content-max: 1680px;
  --gutter: 120px;
  --header-height: 84px;
  --radius-pill: 60px;
  --radius-nav: 42px;
  --radius-tag: 34.5px;
  --radius-ai-chip: 32.5px;
  --btn-height: 59px;
}
```

```
|← 120 →|←——————— content 1680 ———————→|← 120 →|
```

`Container`: `mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)]`.

### 4.5 Elevation & effects

| Effect | Spec |
|--------|------|
| Nav glass | `background: rgba(255,255,255,0.1); backdrop-filter: blur(12px); border: 0.5px solid #fff; border-radius: 42px` |
| Brand CTA | `background: linear-gradient(90deg, #FE4A01, #FEBA07); border-radius: 60px; border: 2px solid #FE4A01` |
| Outline CTA | `border: 1px solid #fff; border-radius: 60px; background: transparent` |
| Tag chip | `border: 1px solid #000; border-radius: 34.5px; height: 57px` |
| AI footer chips | white fill, `border-radius: 32.5px`, `shadow: 0 0 4px rgba(0,0,0,0.25)` |
| Dividers | 1px lines across content width (services, footer) |

---

## 5. Information architecture

### 5.1 Primary navigation (from `1720:4563`)

| Label | Type | Target |
|-------|------|--------|
| Logo | Link | `/` |
| Projects | Link | `/projects` or `#projects` |
| Services | Link | `/services` or `#services` |
| Agency | Link | `/agency` |
| Work with us | Secondary button | `/contact` |
| Business Design | Primary gradient button | Product / contact CTA |

Floating showreel CTA: **Cup of tea ?** (`1720:4558`).

### 5.2 Footer (`1720:4482` / implement node `1804:1909`)

**Component:** `src/components/layout/Footer.tsx` · rendered site-wide from `src/app/layout.tsx` (after `<main>`).

| Block | Content |
|-------|---------|
| Brand mark | Large faint **RIES** outline + left gold glow + golden-ratio spiral |
| Say Hello! | `theoriesconsulting@gmail.com` (`mailto:`) |
| Contact us | `+91 9912983515` (`tel:`) |
| Our Address | `2nd & 3rd Floor, Plot, No, 73P, Beverly Hills, Guttala_Begumpet, Kavuri Hills, Jubilee Hills, Hyderabad, Telangana 500033` |
| Summarise Theories | Ask ChatGPT / Ask Claude / Ask Perplexity white pills (logos + links) |
| Social | Facebook · Linkedin · Instagram + ↗ arrow (`#` until real URLs exist) |
| Legal | `©2026 Theories Consulting` · Privacy Policy · Terms & Conditions |

**Assets (`public/images/`)**

| File | Use |
|------|-----|
| `footer/ries-outline.svg` | Outline RIES wordmark |
| `footer/golden-ratio-spiral.svg` | Right decorative spiral |
| `footer/divider-line.svg` | Optional hairline (layout uses CSS borders) |
| `icons/ask-chatgpt.png` | ChatGPT pill logo |
| `icons/ask-claude.png` | Claude pill logo |
| `icons/ask-perplexity.png` | Perplexity pill logo |
| `icons/arrow-external.svg` | Social external arrow (rotated 45°) |

**AI pill destinations** (Figma had no URLs — share/search prompt pattern):

- ChatGPT → `https://chatgpt.com/?q=…`
- Claude → `https://claude.ai/new?q=…`
- Perplexity → `https://www.perplexity.ai/search/new?q=…`

---

## 6. Component library (build these first)

### 6.1 `Header` / `Navbar`

| Spec | Figma @ 1920 | Code |
|------|--------------|------|
| Size | `1396 × 84`, top `30px` | Fluid clamps in **D3** |
| Shape | Pill radius `42px` | Fluid radius |
| Background | White 10% glass + white border | See 4.5 |
| Logo | Wordmark ~`220 × 25` | SVG, fluid height |
| Nav | Poppins Bold 24 white | `text-nav` |
| CTAs | Outline + gradient, height `59` | `Button` |

### 6.2 `Button`

| Variant | Look | Height | Radius | Type |
|---------|------|--------|--------|------|
| Primary gradient | `#FE4A01 → #FEBA07`, white text | 59 | 60 | `text-cta` |
| Secondary outline (dark) | Transparent + white border | 59 | 60 | `text-cta` |
| Secondary outline (light) | Transparent + black border | 59 | 60 | `text-cta` |
| Tag chip | Transparent + black border | 57 | 34.5 | `text-tag` |
| AI chip | White fill + soft shadow | 65 | 32.5 | Poppins Bold 18 |

Hover: slight brightness on gradient; outline invert or border thicken. Focus-visible: `2px` outline `--color-focus` offset `2px`.

### 6.3 `StatBlock`

Number (`text-stat`) + label (`text-body-sm` `#686868`) + vertical divider between items.

Home stats: **30+ Clients · 25+ Industries · 300+ Projects · 20+ Employees**.

### 6.4 `ProjectCard` / Projects section (`1845:2081`)

**Layout:** white band; grid **2 → full → 2 → full → 2**; stacks to **1 col below `lg`**. Gap between half columns ≈ `50px`.

Two media patterns (same sizes if video replaces image):

1. **Half card** — frame `aspect-[815/726]` (e.g. HBB, Celeste, Aircraft, Eswap, Zykaz, RPPL).
2. **Wide card** — frame `aspect-[1404/767]` + `max-w` 1404 (e.g. MOHA, Lohitha).

Videos (when set): `autoPlay` + `muted` + `loop` + `playsInline`; `object-cover` inside the same aspect box — **do not change width/height per breakpoint**.

#### Typography (locked product sizes)

| Role | Desktop | Tablet (`md`–`lg`) | Mobile (`max-md`) |
|------|---------|---------------------|-------------------|
| Section H2 | up to **64px** (`text-h2`) | **42px** | **38px** |
| Project title | up to **44px** (`text-h3`) | **28px** | **28px** |
| Description | up to **17px** (`text-body-sm`) | fluid (same utility) | fluid (same utility) |
| Tag pill | up to **18px** | **10px** | **10px** |

All description + tag text: **Poppins Regular** (`font-normal`) — no Bold.

#### Tag row behavior (desktop / mobile exceptions)

| Project | Rule |
|---------|------|
| Aircraft | Desktop: break before **Social Media** (2nd line) |
| Eswap.in | Desktop: all tags **one row** (`lg:flex-nowrap`) |
| Celeste | Mobile only: all tags **one row** (`flex-nowrap md:flex-wrap`) |

#### Media currently on video

| Project | Video path |
|---------|------------|
| Hyderabad Black Birds | `/videos/hbb.mp4` |
| MOHA | `/videos/mp4.mp4` |
| Eswap.in | `/videos/1fc9-e07c-4600-89f7-1342fa087fc7.mp4` |
| Lohitha Foods | `/videos/1c42-c2fb-4cc7-abbe-3b32bf8552e1.mp4` |
| Zykaz Clothing Brand | `/videos/zykaz.mp4` |

Celeste, Aircraft, RPPL still use static images under `public/images/projects/`.

### 6.5 `ServiceRow` / Services section (`1804:1904`)

**Layout:** black band `1920 × 1673`; content inset `120`; H2 + four rows; full-width hairlines (`#fff` @ ~20%) above each row and below the last.

**Desktop spacing (Figma @ 1920 — lock these proportions):**

| Item | Value |
|------|-------|
| Section top padding | `149px` → `clamp(2.5rem, 7.76vw, 9.3125rem)` |
| H2 → first hairline | `252px` from H2 top (~`124px` after 2-line title) → `mt-[clamp(2.5rem,6.46vw,7.75rem)]` |
| Row height | `300px` → `h-[clamp(11.25rem,15.625vw,18.75rem)]` (120 / 60 / 120) |
| Number left (in content) | `5.536%` (x `213`) |
| Icon left | `20%` (x `456`), size `60` |
| Title left | `25.357%` (x `546`) |
| Description left / width | `61.548%` / `32.917%` (x `1154`, w `553`) |

Desktop row: absolute columns inside relative row (not a flex squeeze).  
Tablet/mobile (`max-lg`): stack number+icon+title, then description.

| # | Title | Icon |
|---|-------|------|
| 01 | Shaping Theories | `/images/icons/service-shaping.png` |
| 02 | Building Theories | `/images/icons/service-building.png` |
| 03 | Transforming Theories | `/images/icons/service-transforming.png` |
| 04 | Crafting Theories | `/images/icons/service-crafting.png` |

#### Typography

| Role | Desktop (`lg+`) | Tablet (`md`–`lg`) | Mobile (`max-md`) |
|------|-----------------|---------------------|-------------------|
| Section H2 | up to **64px** (`text-h2`) | **42px** | **38px** |
| Number + title | up to **50px** Power Grotesk Regular | **28px** | **28px** |
| Description | up to **18px** Poppins Regular (Figma) | **15px** | **15px** |

Description copy (placeholder in Figma, same on all four): *In Shaping theories we work on Brand Naming, Brand Identity, Brand Positioning and Brand Strategy.*

Icon size: `size-[clamp(40px,3.125vw,60px)]` desktop; `40px` mobile.

### 6.6 `TestimonialCard` / Testimonials section (`1804:1906`)

**Layout:** black band `1920 × 992`; H2 + split card + vertical carousel nav.

| Item | Figma @ 1920 | Code |
|------|--------------|------|
| Section top pad | `108px` | `pt-[clamp(2rem,5.625vw,6.75rem)]` |
| H2 → card | ~`60px` | `mt-[clamp(1.25rem,3.125vw,3.75rem)]` |
| Portrait | `624 × 560` | `aspect-[624/560]` / `w-[clamp(18rem,32.5vw,39rem)]` |
| White panel | `826 × 560` | flex sibling, same height |
| Panel pad L/T | `60` / `95` | `px` / `pt` clamps |
| Nav gap after card | ~`97px` | `lg:gap-[clamp(2.5rem,5.05vw,6.0625rem)]` |
| Nav control | `70 × 71` | outline ↑ / filled ↓ SVGs |

**H2:** *Delivering service excellence* / *our clients depend on* — `text-h2`, break `hidden sm:block`, tablet/mobile **42px**.

**Card type**

| Role | Desktop | Tablet + mobile |
|------|---------|-----------------|
| Headline | **30px** Power Grotesk | **20px** |
| Quote mark | **60px** Power Grotesk | fluid |
| Name | **18px** Poppins Regular | fluid |
| Body quote | **16px** Poppins Regular + `capitalize` | fluid |

**Carousel:** 6 dots (active larger/solid white); prev/next wrap. Portrait: `/images/testimonials/madhu-velugu.png`.

Mobile/tablet: image stacks above white panel; nav sits below (row) then column on `lg`.

### 6.7 `FeaturedProjectCard` / Featured Projects section (`1804:1908`)

**Layout:** black band; H2 *Our Featured Projects*; four metric cards in a row.

| Token | Figma @ 1920 | Fluid / responsive |
|-------|--------------|-------------------|
| Section top pad | `70px` | `pt-[clamp(2rem,3.65vw,4.375rem)]` |
| Section bottom pad | `~182px` | `pb-[clamp(2.5rem,9.48vw,11.375rem)]` |
| H2 → grid | `~60px` | `mt-[clamp(1.25rem,3.125vw,3.75rem)]` |
| Card image | `388 × 325` | `aspect-[388/325]` + full width in column |
| Card footer | `388 × ~129` white | `min-h-[clamp(5rem,6.74vw,8.083rem)]` |
| Grid gap | `~50px` | `gap-[clamp(1.25rem,2.6vw,3.125rem)]` |
| Grid | 4-up | `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` |

**H2:** Power Grotesk via `text-h2` + mobile/tablet locks `max-md:!text-[38px] md:max-lg:!text-[2.625rem]`.

**Card:** image on top + white footer with brand logo (black backgrounds stripped to transparent) + Poppins metric `2.2x increase in Ecommerce sales` at `clamp(0.875rem, 0.9375vw, 1.125rem)`.

**Shipped projects:** Cascades Neopolis · Kiran International School · Versatile · Krishna Dental Hospitals (icon + text SVG).

**Assets:** `public/images/featured/` — `cascades.png`, `cascades-logo.png`, `kiran.png`, `kiran-logo.png`, `versatile.png`, `versatile-logo.png`, `krishna.png`, `krishna-logo-icon.png`, `krishna-logo-text.svg`.

**Component:** `src/components/sections/FeaturedProjects.tsx` · wired after Testimonials on Home.

### 6.8 `MediverseCta`

**Shipped** — `src/components/sections/MediverseCta.tsx` · Figma `1804:1894` / `1720:4546`

| Spec | Implementation |
|------|----------------|
| Band | Full-bleed orange radial via `bg-mediverse` (`globals.css`); desktop min-height `clamp` → `780px` @ 1920 |
| H2 | `text-h2` white; D4 break: `Creative for every business.` / `Growth engineered for healthcare.` (`hidden sm:block`); mobile `max-md:!text-[38px] md:max-lg:!text-[2.625rem]` |
| CTAs | Black pill **Let’s Begin** → `#contact`; white pill **Explore Mediverse** → `https://mediversemarketing.com/` (`target="_blank"`, same as Header) |
| Media | Right column `405 × 720` fluid (`aspect-[405/720]`, `w-[clamp(16rem,21.09vw,25.3125rem)]`); asset `/images/mediverse/cta-media.png` |
| Layout | Desktop: text left + media right (`lg:flex-row lg:items-center`); mobile: stack text then media |

Home order: … → `FeaturedProjects` → `MediverseCta` → Footer.

### 6.9 `Footer` (`1804:1909`)

See **5.2**. Shipped layout:

| Item | Spec |
|------|------|
| Band | Black `bg-black`, `max-w-[1920px]`, gutter `px-[clamp(1.25rem,6.25vw,7.5rem)]` |
| Graphic band | Height `clamp(12rem,25vw,30rem)`; gold radial glow left; RIES SVG; spiral right |
| Content grid | Desktop `lg:` 3 cols (contact · address · social); stacks on mobile |
| Labels | `text-label` (`#686868`) |
| Values | `text-body` white |
| Social | `text-h4` Power Grotesk + rotated arrow asset |
| AI chips | White fill, height → **65px**, radius → **32.5px**, Poppins Regular 18, soft `0 0 4px rgba(0,0,0,0.25)` |
| Legal | Copyright left; Privacy + Terms right; hairline borders `border-white/20` |
| Responsive | Columns stack below `lg`; AI pills wrap; legal stacks below `sm` |

### 6.10 `Container` / `SectionHeading`

- `Container` — fluid gutter, max 1920.
- `SectionHeading` — `text-h2` + optional supporting sentence.

### 6.11 `LogoMarquee`

Partner / Theories logo strip under showreel (`Frame 34`). Continuous marquee per **D6**.

### 6.12 Agency / About hero (`1892:2101`)

**Route:** `/agency` · **Component:** `src/components/sections/about/AboutHero.tsx` · **Page:** `src/app/agency/page.tsx`  
**Nav:** Header Agency link → `/agency` (desktop + mobile share `navLinks`).

| Spec | Figma @ 1920 | Code |
|------|--------------|------|
| Band | Black `1920 × 1109` | `bg-black`, `max-w-[1920px]` |
| Title top | `y=264` | `pt-[clamp(7.5rem,13.75vw,16.5rem)]` (same rhythm as Home hero) |
| H1 | Power Grotesk **64** white, w `1328` | `text-h2` + `max-md:!text-[38px] md:max-lg:!text-[2.625rem]` |
| H1 break | `Driving startup growth` / `crafting your brand with precision & impact` | `<br className="hidden sm:block" />` |
| Body | Poppins **20**, `rgba(255,255,255,0.8)`, w `1018` | `text-[clamp(0.875rem,1.04vw,1.25rem)]`, max-w fluid |
| Title → body | ~`30px` | `mt-[clamp(1rem,1.56vw,1.875rem)]` |
| Media | `1222 × 541` at `x=579` `y=568`; bottom flush; right inset ≈ gutter `120` | `aspect-[1222/541]`, `lg:w-[clamp(40rem,63.65vw,76.375rem)]`, `lg:ml-auto` via `justify-end` + `pr` gutter |
| Asset | Team photo | `/images/about/hero-team.png` |

Hero-only for now — do not invent sections below until additional About frames are approved.

---

## 7. Page section map — Home (`1720:4223`)

| Order | Section | Approx Y / node | Purpose | Components |
|------:|---------|-----------------|---------|------------|
| 0 | Header | `1720:4563` y=30 | Global nav | `Header` |
| 1 | Hero | H1 `1720:4232`, sub `1720:4233`, stats `1720:4234` | Value prop + stats | `StatBlock` |
| 2 | Showreel | `1720:4253` y=780 | Video / reel + “Cup of tea?” | Video, `Button` |
| 3 | Logo marquee | `1720:4225` y=1554 | Brand strip | `LogoMarquee` |
| 4 | Projects | Heading `1720:4364` y=2150 | Case studies grid | `ProjectCard` |
| 5 | View all | `1720:4555` y=7690 | Projects CTA | `Button` |
| 6 | Services | Heading `1720:4387` y=7958 | Four service rows | `ServiceRow` |
| 7 | Testimonials | `1720:4417` y=9590 | Social proof | `TestimonialCard` |
| 8 | Featured projects | `1720:4432` y=10544 | Metric cards | `FeaturedProjectCard` |
| 9 | Mediverse CTA | `1720:4546` y=11316 | Healthcare product band | `MediverseCta` |
| 10 | Footer | `1720:4482` y=12276 | Contact + legal | `Footer` |

**Hero copy (lock unless marketing updates)**

- H1: *Every business is built on a theory.*
- Sub: *An idea about what could be. We help you prove it, scale it, and evolve it. Together, we turn your theory into traction.*

**Projects heading:** *Explore how theory meets execution.*  
**Services heading:** *We shape, build, transform, and design for tomorrow.*  
**Testimonials heading:** *Delivering service excellence our clients depend on*  
**Featured heading:** *Our Featured Projects*  
**Mediverse:** *Creative for every business. Growth engineered for healthcare.*

---

## 8. Responsive strategy

### 8.1 Desktop 15″–24″ (primary goal)

| CSS width | Behavior |
|-----------|----------|
| `1920` | Exact Figma sizes (clamp max) |
| `1440–1919` | Proportional fluid scale via `vw` |
| `1280–1439` | Same composition; still fluid clamps |
| `>1920` | Centered `max-w-[1920px]`; no further growth |

**QA rule:** side-by-side screenshot of 1440 vs 1920 must look like the **same design zoomed**, not a reflowed layout.

### 8.2 Layout breakpoints (structure only)

| Breakpoint | Width | Layout changes only |
|------------|-------|---------------------|
| `xl` | ≥1280 | Full desktop grids (2-col projects, 4-col featured) |
| `lg` | ≥1024 | Header may still show links; 2-col where needed |
| `md` | ≥768 | Stack some project pairs; keep fluid type |
| `sm` / base | <768 | Single column; hamburger nav; marquee peek cards |

Touch targets ≥ `44×44`. Forms stack to one column under `768`.

---

## 9. Suggested project structure

```text
theories/
├── public/
│   ├── fonts/                 # PowerGrotesk-Regular, Poppins-Regular, Poppins-Bold
│   └── images/
│       ├── brand/
│       ├── home/
│       ├── projects/
│       └── shared/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Home
│   │   ├── projects/page.tsx
│   │   ├── services/page.tsx
│   │   ├── agency/page.tsx
│   │   └── contact/page.tsx
│   ├── components/
│   │   ├── layout/            # Header, Footer, Container
│   │   ├── ui/                # Button, Tag, …
│   │   └── sections/          # Hero, Projects, Services, …
│   ├── content/
│   ├── styles/
│   │   ├── tokens.css
│   │   └── globals.css        # @utility fluid type
│   └── lib/
├── DEVELOPMENT_GUIDE.md
└── README.md
```

---

## 10. Development phases

### Phase 0 — Foundations

- [ ] Init Next.js + TypeScript + Tailwind
- [ ] `tokens.css` + fluid `@utility` type scale (**D2**)
- [ ] `Container` with fluid gutter
- [ ] `Button` variants (gradient, outline, tag, AI chip)
- [ ] Confirm local fonts in `public/fonts/` (Power Grotesk + Poppins Regular/Bold)
- [ ] Export logo (light) + favicon

### Phase 1 — Global chrome

- [ ] `Header` (desktop fluid) + mobile menu
- [x] `Footer` (`Footer.tsx` + layout wiring; Figma `1804:1909`)
- [ ] Route shells for Projects / Services / Agency / Contact

### Phase 2 — Home (pixel-critical)

- [ ] Hero + stats
- [ ] Showreel + Cup of tea CTA
- [ ] Logo marquee
- [ ] Projects grid + View all
- [ ] Services rows
- [ ] Testimonials
- [x] Featured projects
- [x] Mediverse CTA
- [ ] Visual QA at **1920, 1680, 1440, 1366** (must match look & feel)

### Phase 3 — Inner pages & polish

- [ ] Projects / Services / Contact when Figma is ready
- [x] Agency (`/agency`) — hero from Figma `1892:2101` (`AboutHero.tsx`); Header Agency → `/agency`
- [ ] SEO, a11y, performance
- [ ] Content proofreading (replace placeholder MOHA blurbs)
- [ ] Cross-browser QA

---

## 11. Content model (scale later)

```ts
type Project = {
  slug: string;
  title: string;
  summary: string;
  cover: string;
  wideCover?: string;
  tags: string[];
  featured?: boolean;
  metric?: string; // e.g. "2.2x increase in Ecommerce sales"
  logo?: string;
};

type Service = {
  number: string; // "01"
  title: string;
  body: string;
  icon: string;
};

type Testimonial = {
  name: string;
  quote: string;
  intro?: string;
  photo: string;
};
```

---

## 12. Interaction & motion

| Interaction | Guidance |
|-------------|----------|
| Page load | Soft fade/slide hero text only |
| Marquees | Continuous; pause on hover; respect reduced motion |
| Carousels | Arrows + optional drag; pause on hover |
| Buttons | 150ms ease |
| Sticky header | Fixed over hero; keep contrast on scroll (optional solidify) |

---

## 13. Accessibility checklist

- [ ] One `h1` per page; logical heading order
- [ ] Meaningful `alt` on project/testimonial images; decorative `alt=""`
- [ ] Contrast ≥ 4.5:1 for body text (watch muted `#686868` on dark)
- [ ] Keyboard: nav, CTAs, carousels, AI pills
- [ ] Visible focus rings (`--color-focus`)
- [ ] Icon-only controls have `aria-label`
- [ ] Landmarks: `banner`, `main`, `contentinfo`, `nav`

---

## 14. SEO & performance

| Topic | Standard |
|-------|----------|
| Titles | `Page — Theories Consulting` |
| Meta description | Unique per page, ~150–160 chars |
| Images | Next/Image, WebP/AVIF; reserve aspect ratios |
| LCP | Hero media + H1; `font-display: swap` |
| CLS | No late font-size jumps; clamp from first paint |
| Fonts | Subset Power Grotesk if possible |

---

## 15. Visual QA process

For every completed section:

1. Figma Dev Mode beside browser at **1920**.
2. Check gutter `120`, type maxima, button `59`, gradient `#FE4A01 → #FEBA07`.
3. Retest at **1680, 1440, 1366** — composition must stay identical (scaled).
4. Spot-check **1024** and **390** for layout collapse only.
5. Mark done when spacing/type/assets are within ~2–4px at 1920 and proportionally correct at 1440.

**Tolerances**

- Spacing @ 1920: ±4px  
- Type @ 1920: exact clamp max  
- 15″–24″: proportional match, not a different layout  
- Color: exact brand gradient stops  

**Acceptance for the main objective**

> A stakeholder viewing the site on a 15″ laptop and a 24″ monitor should recognize the **same** homepage — only scale changes, not structure, hierarchy, or density.

---

## 16. Definition of done (per page)

- [ ] Matches `Home final` structure and copy (or approved CMS content)
- [ ] Fluid type + spacing used; no fixed desktop-only px for the 1280–1920 band
- [ ] Header + Footer shared
- [ ] Responsive layout breakpoints applied
- [ ] Images optimized with aspect ratios
- [ ] A11y + basic SEO meta
- [ ] QA at 1920 **and** 1440 / 1366 signed off

---

## 17. Quick reference — do / don’t

| Do | Don’t |
|----|-------|
| Build from `Home final` (`1720:4223`) | Build from older Home frames |
| Use `clamp(min, N/19.2vw, Npx)` for all desktop sizes | Use `md:` / `2xl:` to change font sizes |
| Cap layout at `max-w-[1920px]` | Stretch the design past 1920 |
| Reuse `Button` / `Container` / type utilities | One-off absolute Figma exports |
| Keep 15″ and 24″ composition identical | Redesign density per laptop size |
| Self-host licensed Power Grotesk | Ship unlicensed / trial fonts |

---

## 18. Change log

| Date | Change |
|------|--------|
| 2026-08-01 | Shipped Agency `/agency` hero from Figma `1892:2101` — `AboutHero.tsx`, asset `public/images/about/hero-team.png`; Header Agency → `/agency` |
| 2026-07-31 | Shipped Footer from Figma `1804:1909` — assets under `public/images/footer/` + AI logos; wired in `layout.tsx` |
| 2026-07-31 | Initial Theories guide from Figma `Home final` (`1720:4223`); fluid 15″–24″ rules inspired by prior Origins IVF development guide patterns |

---

*Questions on ambiguous Figma values: verify in Dev Mode, then update this guide so engineering and design stay aligned.*
