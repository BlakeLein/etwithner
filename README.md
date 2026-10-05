# Ember & Pine: cold brew coffee site

A one-page, no-checkout website for a small-batch cold brew business: a hero, the story, the products,
how to order (Venmo, a pickup calendar, text or email), and a light feedback form. A woodsy, elegant-and-rugged
look: deep forest green, bark brown, warm paper, and a copper ember accent, with a pine-ridge illustration.

> This repo used to be a financial-advisory demo (E.T. Withner). It was replaced with this site, keeping the
> same hosting and deploy (`etwithner.blakelein.com`, auto-deploy on push to `main`).

## Change the words, products, and links

**Everything is in one file: `src/content/site.ts`.** Right now it is SAMPLE content (a placeholder brand,
"Ember & Pine", and three sample products), so replace:

- the **name**, tagline, and story,
- the **products** (name, one-line description, size, price, tasting notes, and an optional ribbon like "Bestseller"),
- the **order links** (`order.links`): the Venmo link (`https://venmo.com/u/THE-HANDLE`), the pickup calendar link
  (a Google Calendar appointment page, Calendly, or any booking link), a text number (`sms:+15551234567`) and an
  email (`mailto:...`). **A link with an empty `url` is left off the page**,
- the **feedback address** (`feedback.to`).

The Venmo and calendar links are generic placeholders (venmo.com and calendar.google.com), and the email is the reserved
`hello@example.com`, so nothing points at a real account until they are replaced.

## Password page (while under development)

The site has a simple password page that is currently OFF (`gate.enabled` is false); the page also tells search engines not to index it (the `noindex` line in `index.html`, to delete once real content is in). The password and the
on/off switch are in `src/content/site.ts` (`gate`). It is a casual gate, not real security: the password is in the
page's own code, so anyone who views the source can read it. **To go public:** set `gate.enabled` to `false` and
delete the `noindex` line in `index.html`.

## Feedback

The form fills in an email to `feedback.to` and opens the visitor's own email app, so there is no server and
nothing is stored. If the owner later wants responses collected in one place, swap the form's submit handler
(`src/components/Feedback.tsx`) for a form service or a small backend.

## Look and feel

Colors, fonts, and textures are variables at the top of `src/index.css` (`--ember`, `--paper`, `--forest-*`, ...).
The illustrations (pine ridge, bottle, coffee bean, divider) are inline SVG in `src/art/Art.tsx`; there are no image
files. Fonts are system serif and sans stacks (no downloads). The paper grain is a tiny inline SVG filter.

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
