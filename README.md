# Withner Coffee Co.

A one-page website for Withner Coffee Co., a small family cold brew business in Jersey Village, Texas. It
shows the product, takes orders (quantity, contact info, payment type, pickup window), and has a contact form.
It is a front-end app only: orders and messages are stored by Netlify Forms, and the buyer is sent on to pay
with the total filled in.

Live at `etwithner.blakelein.com`. Designed and managed by Blake Lein.

## Stack

React 19, TypeScript, and Vite. Plain CSS with variables. No backend, database, or environment variables.
Hosted on Netlify.

## Run it

```
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check and build to dist/
npm run lint
```

Form submissions only work on Netlify. Locally, an order or message ends in the email fallback.

## Change the words, prices, and links

Everything is in **`src/content/site.ts`**: the name, tagline, story, product and price (`UNIT_PRICE`), the
ordering form (max quantity, pickup windows, payment accounts), the contact reasons and address, the About
text, and the designer credit. Links or options with nothing in them are left off the page. Colors and fonts are
variables at the top of `src/index.css`. The illustrations and logo are inline SVG in `src/art/Art.tsx`.

## Orders and messages

- **Ordering form:** Submit posts a Netlify form named `orders`, then a confirmation pops up with how to pay:
  a Venmo button with the total filled in, Zelle instructions, or a note to bring cash to pick-up. With one
  payment option, the payment-type step is skipped.
- **Contact form:** posts a Netlify form named `contact`, with a "Reason for contact" menu (Order Inquiry, Need
  Support, Feedback).
- The hidden forms in `index.html` are how Netlify finds them at build time. If you rename a form or change a
  field, update `index.html` and `src/components/Order.tsx` or `Contact.tsx` together.
- Notification emails are set in Netlify under Site settings, Forms, Form notifications.

## Deploying

Netlify builds from `main` using `netlify.toml` (`npm run build`, publish `dist/`, Node 22). A push to `main`
deploys. `.github/workflows/deploy.yml` is an older deploy to an EC2 server and still runs on push; it can be
retired once it is no longer needed.

## Going public

The site includes a `noindex` tag so search engines skip it. Delete that line in `index.html` when the content
is final. A simple password page also exists (`gate` in `site.ts`); it is off.

## Before launch

- Replace the sample pickup windows with times that work for Evan.
- Set the real contact email (`contact.to`) and the Netlify form notification emails.
- Replace the sample About text and tasting notes.
