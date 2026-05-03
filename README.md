# leanny.org — Personal Website

## What this is

A personal website hosted at `leanny.org`, served from a Raspberry Pi Zero at home via a Cloudflare Tunnel. CURRENTLY NOT RUNNINGs

## Infrastructure

- The Pi Zero already runs another app (`home-lab.leanny.org`) via Cloudflare Tunnel
- This site will be a second ingress on the same tunnel, pointing to a new server process on a different port (e.g. 4000)
- Cloudflare handles TLS — local server runs plain HTTP
- Deployment: build locally → SCP `dist/` to Pi → serve as static files

## Tech stack decision

**Astro** — static site generator. Chosen because:
- Blog/trip posts written in Markdown (one `.md` file per trip)
- Builds to pure static HTML/CSS/JS, no runtime
- Built-in content collections for the trips/blog section
- Vite-based build (same mental model as the other project)

## Pages / Structure

- `/` — main landing / hero page
- `/about` — about section
- `/trips` — lists all trip posts
- `/trips/[slug]` — individual trip post with text and pictures

## Content workflow

To add a new trip:
1. Create `src/content/trips/my-trip.md` with frontmatter (title, date, cover image)
2. Write markdown body, drop images in `public/`
3. `pnpm build` → `dist/`
4. SCP `dist/` to Pi Zero

## No backend needed

- No login, no auth, no database
- Fully static — just files on disk
- Images served as static assets

## Cloudflare Tunnel addition needed

Add to `/etc/cloudflared/config.yml` on the Pi:
```yaml
- hostname: leanny.org
  service: http://localhost:4000
```

Then:
```bash
cloudflared tunnel route dns <tunnel-name> leanny.org
sudo systemctl restart cloudflared
```
