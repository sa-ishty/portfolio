# Shahriar Adnan Ishty · Portfolio

Personal portfolio of Shahriar Adnan Ishty, network engineer intern at the AIUB IT Department. The site reads like a Cisco console: every section opens with the IOS command that would show it.

Built with Next.js (App Router), TypeScript, Tailwind CSS and shadcn/ui. Live at https://sa-ishty.github.io/portfolio/ (GitHub Pages).

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Update the content

All text lives in `src/data/`. Adding a project, video or milestone means editing one JSON file, never the layout code.

| To change | Edit |
| --- | --- |
| Name, links, email, CV | `src/data/profile.json` |
| Focus areas table | `src/data/focus.json` (`status`: up, in progress, learning, planned) |
| Projects | `src/data/projects.json` (`featured: true` shows it on the home page) |
| Learning journey | `src/data/journey.json` (`status`: done, now, next) |
| Videos and series | `src/data/content.json` |
| Gallery photos | put files in `public/gallery/`, list them in `src/data/gallery.json` |
| Exhibitions, roles, gear | `src/data/leadership.json` |
| Experience, education, research, ventures, skills | the matching JSON file |

To add the CV, put it at `public/cv.pdf` and set `"cv": "/cv.pdf"` in `profile.json`.

Example gallery entry:

```json
{ "src": "/gallery/sunset.webp", "alt": "Sunset over the Buriganga", "width": 1600, "height": 1067, "exif": "f/4 · 50mm · 1/500s · Dhaka" }
```

## Theme

Colors come from [this palette](https://coolors.co/palette/0d1b2a-1b263b-415a77-778da9-e0e1dd) and are defined once in `src/app/globals.css`. Dark is the default; the toggle in the header switches to light and remembers the choice.

## Deploy

Every push to `main` builds a static export and publishes it to GitHub Pages (`.github/workflows/deploy.yml`). The workflow sets `PAGES_BASE_PATH=/portfolio` because Pages serves the site from that subfolder.

To host on Vercel or Cloudflare Pages instead, import the repo there and leave `PAGES_BASE_PATH` unset. Then update `siteUrl` in `src/data/profile.json`.
