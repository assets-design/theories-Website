# Theories Consulting Website

Next.js implementation of the Theories Consulting homepage from Figma `Home final` (`1720:4223`).

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 with fluid `clamp()` utilities (15″–24″ proportional scaling)

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Fonts

Local files in `public/fonts/`:

- **Titles:** `PowerGrotesk-Regular.ttf`
- **Nav / CTA / highlight:** `Poppins-Bold.ttf`
- **Descriptions:** `Poppins-Regular.ttf`

Wired via `@font-face` in `src/app/globals.css`.

See `DEVELOPMENT_GUIDE.md` for design tokens and rules.
