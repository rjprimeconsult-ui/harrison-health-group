# Harrison Health Group website — rules for Claude

You are helping the site owner (not a developer) make small website changes from a Claude Code cloud
session. Keep every change small, safe and explained in plain English.

## How this repo is published
- This site is built and hosted in **Manus**. The repo's `main` branch syncs into Manus automatically.
- The owner's change reaches the live site only after **Juan Trejo** pulls it into Manus, checks the preview and
  clicks **Publish**. Never claim a change is "live".
- Workflow: make the requested change on your session branch → run the checks below → push → tell the owner to
  click **Create PR**, then **Merge pull request → Confirm merge** on GitHub, then text Juan "Merged: <what changed>".

## Before you push (every time)
1. `pnpm install --frozen-lockfile`
2. `pnpm verify` (unit tests, TypeScript, production build, route checks). If it fails, fix your own change or undo
   it. Never push a failing build, never delete or weaken a test to make it pass.
3. Summarize for the owner, in plain English, exactly what changed and on which page.

## Where content lives
- Business name, phone, email, booking and review links: `shared/site.ts`
- Page titles and descriptions (search results): `shared/site.ts` (`publicPages`) and `shared/seo.ts`
- Licensed states map: `shared/service-area.ts`
- Team names, titles, photos, specialties: `client/src/content/team.ts`
- Resource guides: `client/src/content/guides.ts`
- Page text and sections: `client/src/pages/` and `client/src/components/sections/`
- Images: `client/public/`
- Search the repo for the exact words the owner quotes before editing.

## Do not change (stop and tell the owner to ask Juan)
- `server/`, `scripts/`, `patches/`, `vite.config.ts`, `package.json`, `pnpm-lock.yaml`, `tsconfig*.json`,
  `.gitignore`, `internal/`, and anything Manus-generated (`client/public/__manus__/`).
- The quote/lead form and its delivery (`LeadForm.tsx`, `QuoteModal.tsx`, the Web3Forms key), the Google Ads tag
  and conversion code (`client/src/lib/measurement.ts`), and the Google reviews integration
  (`client/src/lib/google-reviews.ts`, `ReviewContext.tsx`).
- `/privacy` and `/terms` wording: counsel must approve it.
- Never add new packages, never rename/move/delete files or pages, never commit secrets or `.env` files.

## Insurance advertising rules (Florida-based health insurance agency)
- No prices, premiums, savings amounts, statistics, guarantees, "best/cheapest/lowest", or "free" claims.
- No reviews or testimonials unless the owner provides the real source; never invent one.
- Do not add or change license numbers (NPN), carriers, credentials, state counts, or "nationwide" claims. The
  licensed-states map lists 31 states (Delaware included, New Mexico excluded); change it only on the owner's
  explicit instruction and record that instruction.
- Facts must match `BRAND-FACTS.md`. Anything marked UNVERIFIED there stays off the public site.
- When you change a public fact (phone, email, team title, states, links), update the matching row in
  `BRAND-FACTS.md` and add a dated line to `CONTENT-LEDGER.md` saying the owner requested it.

## If the request is unclear or risky
Ask the owner one short question instead of guessing. If it touches anything in "Do not change" or the
insurance rules, explain why in one sentence and suggest they ask Juan.
