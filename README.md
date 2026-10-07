# Withner Coffee Co.: cold brew coffee site

A one-page, no-checkout website for a small-batch cold brew business: a hero, the story, the products,
a light ordering form (quantity, contact info, pickup window, then pay with Venmo), and a contact form. A modern, minimal look: lots of
white, black type, and three bright colors (coral, blue, yellow), with flat drink illustrations.

> This repo used to be a financial-advisory demo (E.T. Withner). It was replaced with this site, keeping the
> same hosting and deploy (`etwithner.blakelein.com`, auto-deploy on push to `main`).

## Change the words, products, and links

**Everything is in one file: `src/content/site.ts`.** Right now it is SAMPLE content (a placeholder brand,
"Withner Coffee Co."), so replace:

- the **name**, tagline, and story,
- the **product** (the page is laid out for one: name, description, size, tasting notes) and its price (`UNIT_PRICE` near the top),
- the **ordering form** (`order` in `site.ts`): the max quantity, the **pickup windows** (SAMPLE: use only times that work for the owner), the
  and the payment accounts (`payments`; only the Venmo handle is real so far),
- the **contact address** (`contact.to`; it is `hello@example.com` for now).

## Ordering form

Steps: pick a quantity (the price updates), enter contact info, choose a payment type and a general pickup window, then **Submit order and pay**.
On submit the order is POSTed as a Netlify form named `orders` (the hidden copy in `index.html` is how Netlify finds it; keep its field names in
step with `src/components/Order.tsx`), and the buyer is then sent to the chosen app's pay screen with the total filled in (Venmo also gets a note;
Zelle has no pay link, so the buyer is shown where to send it). With only one payment type, that step is skipped.

This only works while the site is hosted on Netlify (set the email notification under Site settings > Forms). On any other host, such as the
current EC2 server, the post is refused and the buyer is shown a link to email the order plus the way to pay, so no order is lost.

## Contact form

On Netlify the form is stored there and emailed to the owner. On the current server (no backend), the post is refused and the
visitor is offered a link that opens their own email app, addressed to `contact.to`. To collect messages in one place on
this host, swap the submit handler in `src/components/Contact.tsx` for a form service or a small backend.

## Look and feel

Colors and fonts are variables at the top of `src/index.css` (`--coral`, `--blue`, `--yellow`, `--ink`, ...).
The illustrations (glasses, jug, coffee bean, dots) are inline SVG in `src/art/Art.tsx`; there are no image
files. Fonts are a system sans stack (no downloads).

## Run it

```
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check and build to dist/
npm run lint
```

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`: it SSHes to the server, pulls, and runs `npm install` and
`npm run build` there (nginx serves `dist/`). That builds on the server itself, which has little memory; if hosting
moves, prefer building in CI and uploading `dist/` (the pattern the larger sites use). The site has no backend and no
environment variables, so it can be hosted anywhere that serves static files.
