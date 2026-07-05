# leanny.org — Personal Website

Currently hosted in Cloudflare. https://leanny.org
Personal website built with Astro, which used to be self-hosted on a Raspberry Pi Zero at home via a Cloudflare Tunnel. 


## Tech Stack
- **Astro** — static site generator, Markdown-based content. Chosen because blog/trip posts are written in Markdown, builds to pure static HTML/CSS/JS, and has built-in content collections for the trips/blog section.
- **Cloudflare Tunnel** — exposes the Pi to the internet without port forwarding, handles TLS - NOT ANYMORE
- **Raspberry Pi Zero** — home server, runs alongside other self-hosted apps - NOT ANYMORE

## Features
- Trip/blog posts written in Markdown
- Fully static — no login, no auth, no database
- Self-hosted infrastructure on low-power hardware

## Infrastructure
- The Pi Zero also runs `home-lab.leanny.org` via the same Cloudflare Tunnel
- This site runs as a second ingress on that tunnel, pointing to a different port (e.g. 4000)
- Deployment: build locally → SCP `dist/` to Pi → serve as static files

## Pages / Structure
- `/` — main landing / hero page
- `/about` — about section
- `/trips` — lists all trip posts
- `/trips/[slug]` — individual trip post with text and pictures

## Content Workflow
To add a new trip:
1. Create `src/content/trips/my-trip.md` with frontmatter (title, date, cover image)
2. Write markdown body, drop images in `public/`
3. `pnpm build` → `dist/`
4. SCP `dist/` to Pi Zero

## Cloudflare Tunnel Setup
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
