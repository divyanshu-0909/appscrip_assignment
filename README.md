# Appsscrip Demo Store (Next.js)

This repository is a minimal Next.js (React) demo showcasing:

- SSR (Server Side Rendering) with getServerSideProps
- Plain HTML/CSS/JavaScript (no CSS frameworks; no TypeScript)
- SEO: metadata, H1/H2, JSON-LD Schema
- Responsive layout for mobile & tablet
- Minimal DOM and lightweight components
- Uses data from https://fakestoreapi.com (optional)

## How to run locally

1. Install dependencies

```powershell
npm install
```

2. Start the dev server

```powershell
npm run dev
```

Open http://localhost:3000

## Build and production

```powershell
npm run build
npm start
```

## Deploy

- Netlify: Use the official Next.js support via the Netlify plugin `@netlify/plugin-nextjs` (recommended). See: https://docs.netlify.com/integrations/frameworks/next-js/

  - Build command: `npm run build`
  - Publish directory: `./` (Netlify uses the plugin to route serverless functions)
  - For a fully static export (no SSR), use: `npm run export` and publish the `out` folder.

- Vercel: Directly deploy the repo — Vercel supports SSR.

Troubleshooting deployments:

- If your deployment returns ERR_CONNECTION_TIMED_OUT or a 5xx error, check these things first:
  1. Visit the host's dashboard (Vercel or Netlify) and inspect the latest deployment logs; look for failed server startup or runtime errors.
 2. Confirm the domain and DNS in the host settings if you mapped a custom domain.
 3. For Vercel: look at the Serverless Function logs for routes using SSR (getServerSideProps) — any outbound fetch errors will show here.
 4. For Netlify: ensure you're using `@netlify/plugin-nextjs` so that SSR pages are handled properly.
 5. Use the health endpoint in this repo to test whether the site/serverless functions are reachable:
     - https://<your-deployment>.vercel.app/api/health
     - A healthy response should be 200 and return JSON: { status: 'ok' }
 6. If 3rd-party API fetches (e.g., fakestoreapi.com) are failing or slow in the server environment, this repository falls back to a bundled `data/sampleProducts.json` so pages still render. Check the function logs to see whether the fallback was used.

Quick checks you can run on a deployed site (copy/paste into a terminal):

- Static health check (always served from the CDN if deployment serves static assets):
  - curl https://<your-deployment>.vercel.app/health.html
- API health (serverless function):
  - curl https://<your-deployment>.vercel.app/api/health
- Status payload (serverless function introspection):
  - curl https://<your-deployment>.vercel.app/api/status
- Test whether the server can fetch the upstream API (fakestoreapi):
  - curl https://<your-deployment>.vercel.app/api/test-fetch

If the static `health.html` works but `/api/health` or `/api/status` times out or returns an error, then the serverless runtime is failing (cold start, memory, or runtime errors). Check Vercel/Netlify function logs for that route.

Troubleshooting hints:
- If `health.html` also fails (connection timed out): the deployment isn't reachable; confirm that the project shows "Deployed" in your Vercel dashboard and there are no DNS or domain issues.
- If `status` returns JSON but `test-fetch` shows an error: your serverless environment may block external calls or the external API is down/blocked by the host.
- If you need to minimize runtime risk, use SSG (Static Generation) for the product listing and switch the product detail to SSG/ISR as well; this avoids runtime SSR fetches.

If you'd like, I can add a simple health check route for the root or create an automated uptime check.

If your site is timing out during runtime (SSR), re-deploying with SSG/ISR can reduce runtime risks. This repo now offers pre-rendering (SSG) with ISR for pages that were previously SSR — this reduces runtime fetches and helps deployments that have network or function cold start limits.

How to re-deploy after changes (Vercel):
1. Push your changes to GitHub (already configured with Vercel):

```powershell
git add .
git commit -m "SSG: convert SSR to SSG/ISR; add health and diagnostics"
git push origin main
```

2. Visit Vercel Dashboard -> Projects -> Your Project -> Deployments, and ensure the new deployment finishes.
3. Check the static + API endpoints after the deployment completes:
  - https://<your-deployment>.vercel.app/health.html
  - https://<your-deployment>.vercel.app/api/health
  - https://<your-deployment>.vercel.app/api/status
  - https://<your-deployment>.vercel.app/api/test-fetch

If you want, I can also convert the product detail page(s) to SSG with pre-generated content or switch to fully static export — tell me which approach you prefer.

## SEO and Accessibility

- Page title and description set in `pages/index.js`
- H1 and H2 structure present
- Images use `alt` text and lazy loading
- Schema added in `pages/_document.js`

## Repo naming

- When pushing to Github, name the repo: `Appsscrip-task-<your-name>` (replace `<your-name>`)

## Notes

- We intentionally avoid external CSS frameworks such as Tailwind or Bootstrap.
- The code uses minimal JS and DOM elements for the product cards.
- You can optionally switch to client-side fetches or SSG/ISR depending on your requirements.
