# Withner Coffee Co.: cold brew coffee site

A one-page, no-checkout website for a small-batch cold brew business: a hero, the story, the products,
how to order (Venmo and a pickup calendar), and a contact form. A modern, minimal look: lots of
white, black type, and three bright colors (coral, blue, yellow), with flat drink illustrations.

> This repo used to be a financial-advisory demo (E.T. Withner). It was replaced with this site, keeping the
> same hosting and deploy (`etwithner.blakelein.com`, auto-deploy on push to `main`).

## Change the words, products, and links

**Everything is in one file: `src/content/site.ts`.** Right now it is SAMPLE content (a placeholder brand,
"Withner Coffee Co."), so replace:

- the **name**, tagline, and story,
- the **product** (the page is laid out for one: name, description, size, price, tasting notes). The Venmo handle and amount are the three constants near the top (`VENMO_HANDLE`, `VENMO_AMOUNT`, `VENMO_NOTE`); `venmoUrl` opens Venmo's pay screen with them filled in,
- the **pickup calendar** link in `order.links` (a Google Calendar appointment page, Calendly, or any booking link; it is a placeholder now). **A link with an empty `url` is left off the page**,
- the **contact address** (`contact.to`; it is `hello@example.com` for now).

## Password page (while under development)

The site has a simple password page that is currently OFF (`gate.enabled` is false); the page also tells search engines not to index it (the `noindex` line in `index.html`, to delete once real content is in). The password and the
on/off switch are in `src/content/site.ts` (`gate`). It is a casual gate, not real security: the password is in the
page's own code, so anyone who views the source can read it. **To go public:** set `gate.enabled` to `false` and
delete the `noindex` line in `index.html`.

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
