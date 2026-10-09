# Withner Coffee Co.

A one-page website for Withner Coffee Co., a small family cold brew business in Jersey Village, Texas. It
shows the product, takes orders (quantity, contact info, payment type, pickup window), and has a contact form.
It is a front-end app only: orders and messages are stored by Netlify Forms, and the buyer is sent on to pay
with the total filled in.

Live at `https://withnercoffeeco.com`, hosted on Netlify (Netlify's own address is `etwithnercoffee.netlify.app`). Designed and managed by Blake Lein.

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
deploys. **Netlify is the only host.** An older copy on the AWS server (`etwithner.blakelein.com`) and its deploy
workflow were retired on 2026-10-09 and the address was taken off the server entirely (its nginx site and
certificate are deleted; the DNS record may still exist and now goes nowhere). The server only hosts the admin
(`etwadmin`, at `admin.withnercoffeeco.com`), which receives orders and messages from Netlify Forms.

### If you ever host it on the server again

It can be done, but read the caveat first.

**Caveat: the forms only work on Netlify.** The order and contact forms are Netlify Forms (`data-netlify` in
`index.html`). On any other host the form posts fail, so a server copy shows the page but **cannot collect orders or
messages** (visitors would only get the email fallback), and the admin would receive nothing. Hosting it elsewhere also
means replacing the forms with something that posts to the admin directly.

If you still want a copy on the server (for example as a static preview):

1. Build on your own computer, never on the server: `npm install`, then `npm run build`.
2. Copy `dist/` to the server, for example `rsync -az --delete dist/ ec2-user@<server>:/var/www/etwithner/dist/`.
   Use a limited deploy user rather than a full-power login (see `SECURITY.md`).
3. Add an nginx site (then `sudo nginx -t` and reload):

   ```
   server {
       listen 80;
       server_name <the-name>.blakelein.com;
       root /var/www/etwithner/dist;
       index index.html;
       include snippets/security-headers.conf;
       add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
       location / { try_files $uri $uri/ /index.html; }
   }
   ```
4. Add the DNS record, then get a certificate: `sudo certbot --nginx -d <the-name>.blakelein.com`.
5. Prove renewals still work: `sudo certbot renew --dry-run --cert-name <the-name>.blakelein.com`.
6. Any redirect for that name must be a `location /` block, not a server-level `return`, or certificate renewal fails.

## Going public

The site includes a `noindex` tag so search engines skip it. Delete that line in `index.html` when the content
is final. A simple password page also exists (`gate` in `site.ts`); it is off.

## Before launch

- Replace the sample pickup windows with times that work for Evan.
- Set the real contact email (`contact.to`) and the Netlify form notification emails.
- Replace the sample About text and tasting notes.
