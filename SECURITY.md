# Security standards: etwithner (the Withner Coffee Co. public site)

The public one-page site (React, hosted on Netlify). Orders and messages are collected by Netlify Forms and forwarded to the Withner admin (`etwadmin`). No backend, database or secrets here.

The master plan for the server and every app is lein-house-helper `docs/planning/security-hardening-plan.md`; its tickets are on the "Family Frontier Security" board on the production Projects module.

## Standards that apply to every change

1. **Secrets** never go in the repo, in logs, or in chat. Server `.env` files are mode 600, owned by the app's own user.
2. **Validate at the edge.** Every field from outside is checked for type, length and format on the server (the browser check is a convenience), and
   stored with parameterized queries only. Output that contains user text is escaped; no raw HTML from users.
3. **Public endpoints** (anything without a sign-in) have size limits, a rate limit (nginx and in the app) and a bot trap or CAPTCHA. A visitor's words
   never go into an email header or subject.
4. **Dependencies:** no high or critical `npm audit` finding on production packages when pushing; lockfile committed; Dependabot on; never run
   `npm install` or `sudo` on the server for a deploy.
5. **Deploys:** a green workflow is not proof. Confirm the server's git commit and the new behavior after every deploy. Deploy users get the least
   privilege that works, and the workflow stops on the first error.
6. **Server:** each app runs as its own unprivileged user, listens on `127.0.0.1` only, and sits behind the shared nginx headers and rate limits.
7. **Changes to the server, DNS, accounts or production data** are made only when Blake asks, with the exact change shown first.
8. **Keep the plan current:** when an item ships, mark it done in the plan and move its card on the Security board
   (project "Family Frontier Security", FFS tickets, on the production Projects module).

## Specific to this project

- **Netlify Forms are the intake.** The hidden `orders` and `contact` forms in `index.html` must match the fields in the components; Netlify's spam filter and honeypot stay on.
  The free plan caps submissions at 100 a month, so a bot can use up the quota: protect it (W-6).
- Nothing secret in the front end. Payment handles (Venmo, Zelle) are public by design; no card or bank numbers are ever collected.
- Allowed pickup windows, payment types and prices in `src/content/site.ts` must match `etwadmin/backend/src/shop.ts`; the admin re-checks everything.
- Security headers belong in a Netlify `_headers` file (CSP, nosniff, frame protection, referrer policy; W-7). The privacy line ("Your information is private and never sold")
  must stay true.
- The legacy server copy was retired and then **offloaded from the server entirely on 2026-10-09** (W-13, W-14): files, deploy workflow, nginx site and certificate are deleted; the old
  DNS name `etwithner.blakelein.com` may remain and goes nowhere (delete it when convenient, and always before releasing or changing the server's IP address).

## Open work (plan items)

Easy: headers file (W-7), form quota and spam protection (W-6), package updates (2 high findings).
