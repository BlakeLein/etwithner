# etwithner: Withner Coffee Co.

One-page, front-end-only web app for Withner Coffee Co., a small family cold brew business (owner: Evan
Withner). It shows the product, takes orders, and collects contact messages. Designed and managed by Blake
Lein. There is **no backend, no database, and no environment variables**: orders and messages are captured
by **Netlify Forms**, and the buyer is then sent to a payment app (Venmo, etc.) with the total filled in.

## Quick facts

- TypeScript, React 19, Vite 8. Plain CSS (`src/index.css`) with CSS variables. No UI library, no tests.
- Hosted on **Netlify**, built from `main` using `netlify.toml` (`npm run build`, publish `dist/`, Node 22).
  Pushing to `main` deploys, so **commit and push only when Blake asks**.
- Live address: `https://withnercoffeeco.com` (Netlify's own address is `etwithnercoffee.netlify.app`). The site still carries `noindex` and the password gate is off
  (`gate.enabled: false`), so it is reachable by link but not searchable.
- The old EC2 copy (`etwithner.blakelein.com`) was **retired 2026-10-09 and taken off the server entirely**: its files, deploy workflow, nginx site and
  certificate are gone (the DNS record was kept on purpose for a possible future staging environment and goes nowhere for now). Netlify is the only host; the server hosts only the admin (`etwadmin`). To host it on the
  server again, see README "If you ever host it on the server again" (the forms only work on Netlify).
- `react-router-dom` is listed in `package.json` but not used (it is a single page).

## Commands

```
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b, then vite build to dist/
npm run lint
```

There is no test suite. Check a change with `npm run lint`, `npm run build`, and by looking at the page in a
browser, including a phone-width view (about 390px).

## Layout

```
index.html                 hidden Netlify forms (orders, contact), noindex, page title and description
src/App.tsx                the page, top to bottom, plus the password gate
src/content/site.ts        ALL words, prices, links, pickup windows, payment accounts, the credit line
src/components/            Navbar, Hero, Story, Products, Enjoy, About, Order (checkout), Contact, Footer, PasswordGate
src/art/Art.tsx            all illustrations and the logo icon (inline SVG; no image files)
src/hooks/useScrollReveal  fade-in on scroll (skipped when the visitor prefers reduced motion)
src/index.css              palette variables at the top, then styles by section
public/                    favicon.svg and the standalone logo marks
```

Page order: hero, story, how to enjoy it, product ("What we do best"), about, order, contact, footer. The nav and hero buttons
read **About, Contact, Order**, in that order.

## How things work

- **Order form** (`src/components/Order.tsx`): quantity (price updates), contact info (name, email, and phone
  are all required), payment type (Venmo, Zelle, or Cash), preferred pickup window, then the button **Submit and move on to $X payment**. It POSTs a Netlify form named `orders`, then opens a confirmation modal
  ("Thank you! There is only one more step.") with the order details (name, email, phone, order, pickup,
  payment type, total) instead of redirecting. The modal's button and text depend on the
  payment type: Venmo gets a pay button that opens `venmo.com/etwithner` with the total and a note filled in;
  Zelle shows where to send the money; Cash says to bring it to pick-up, and its blurb does not imply payment
  is needed before Evan schedules pick-up. Evan does not want Cash App or PayPal. With one payment option the
  payment step skips itself.
- **Test the confirmation:** open the page with `?test=1` (Venmo), `?test=2` (Zelle), or `?test=3` (Cash) to
  show the modal with sample details. Nothing is sent.
- **Validation** lives in `src/lib/validate.ts` and is shared by both forms (inline error under each field):
  name is letters, spaces, hyphens, apostrophes, and periods, 2 to 60 characters; email must be a plain valid
  address; phone is numbers only (digits, spaces, parentheses, dashes, plus) and exactly 10 digits (US, an
  optional leading 1); message is required, up to 2000 characters; pickup window and contact reason are required.
  Letters cannot be typed into the phone field. This runs in the browser only, so anything that reads or stores
  submissions (a future admin app) must re-check the same rules server-side and use parameterized queries.
- **Contact form** (`src/components/Contact.tsx`): reason for contact (Order Inquiry, Need Support,
  Feedback), name, email, message. POSTs a Netlify form named `contact`.
- If the POST fails (for example when running locally, where it returns 404), the buyer sees a link to email
  the order or message to `contact.to`, so nothing is lost.
- **Notification emails** are set in the Netlify dashboard (Site settings, Forms, Form notifications), not
  in this repo.

## Planned backend

Orders and messages will also be forwarded from Netlify to a separate admin back end, the `etwadmin` repo
(`etwadmin.blakelein.com`, later `admin.withnercoffeeco.com`), which stores them in SQLite behind a Google
sign-in for Evan and Blake. That server re-checks every field and computes prices itself, so the browser
validation here is a convenience, not the protection. Its allowed pickup windows, payment types, item, price,
and contact reasons (`etwadmin/backend/src/shop.ts`) must match `src/content/site.ts` here; change both together.

## Rules for working here

- **Change content in `src/content/site.ts`**, not in components. Prices come from `UNIT_PRICE`.
- **Netlify form names and fields must match.** The hidden `<form>` elements in `index.html` are how Netlify
  finds the forms at build time. If you rename a form or add, remove, or rename a field, change it in
  `index.html` and in `Order.tsx` / `Contact.tsx` together, or submissions are rejected.
- **Colors and fonts are variables at the top of `src/index.css`.** Keep the look: bold, color-blocked,
  square-edged, muted warm palette (espresso, terracotta, sage, wheat). It is deliberately **not outdoorsy**
  and not minimal-white; no pine trees, trails, or camp wording.
- **No explainer copy.** Blake does not want helper text that narrates what the page does (for example "we
  email your order, then send you to Venmo"). Keep labels short and let the layout speak.
- Do not use the word "brews" on the page. The product is "Cold Brew".
- Do not add dependencies or a backend without asking. Keep the page working at phone width.
- The footer ends with the designer credit ("Website designed and managed by Blake Lein"). Keep it.

## Placeholders still to replace

- Pickup windows in `order.pickupWindows` are **samples**; use only times that work for Evan.
- Payment accounts are real: Venmo `etwithner` and Zelle `etwithner@gmail.com`. Delete a line from
  `order.payments` to drop an option.
- `contact.to` is `hello@example.com` (used only for the email fallback).
- About text and the three tasting notes are sample copy. The logo is a simple drawn mark.
- The Venmo pay link has not been tested end to end with a real payment screen.
- Remove the `noindex` line in `index.html` and confirm `gate.enabled` is `false` when the site is ready to be public.

See `SECURITY.md` for the security standards this project follows.
