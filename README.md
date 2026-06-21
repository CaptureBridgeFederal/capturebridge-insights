# CaptureBridge Insights

The blog / "Insights" section for CaptureBridge Federal Advisors, built with **Astro** (static, fast, SEO friendly) and **Decap CMS** (a no-code `/admin` UI so the team can publish without touching code). Hosted on **Netlify**.

Brand colors: Flag Blue `#002868`, Flag Red `#BF0A30`, Capitol Stone `#F4F0E8`.

---

## What you get

- `/`            Insights index (auto-generated list of posts)
- `/<slug>/`     Each post (answer-first intro, author byline, dates, Article + Organization schema)
- `/rss.xml`     RSS feed (auto)
- `/sitemap-index.xml`  Sitemap (auto)
- `/admin`       Decap CMS editor (login + write + publish)

Posts are Markdown files in `src/content/insights/`. One is included as a working example.

> Note: this project was authored without a local build (the build sandbox blocks the npm registry). The first real compile happens on `npm install` locally or on Netlify. If anything errors on first build, it is almost always a version mismatch in `package.json` — send me the build log and I will fix it.

---

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs static site to dist/
```

---

## Deploy to Netlify (recommended: subdomain first)

This is the lowest-risk way to go live without touching the existing hand-built site.

1. **Put this folder in a Git repo** (GitHub/GitLab). Push it.
2. In Netlify: **Add new site → Import an existing project →** pick the repo.
   - Build command: `npm run build`
   - Publish directory: `dist`
   (Both are already set in `netlify.toml`.)
3. **Point a subdomain at it.** In Netlify → Domain settings, add `insights.capturebridgefederal.com` and follow the DNS instructions (a CNAME at your DNS provider).
4. Confirm `site` in `astro.config.mjs` is `https://insights.capturebridgefederal.com` (it is by default).

### Turn on the /admin editor (Decap CMS)

Decap publishes by committing to your Git repo through Netlify Identity + Git Gateway.

1. Netlify → **Site configuration → Identity → Enable Identity**.
2. Identity → **Registration: Invite only** (so only your team can log in).
3. Identity → **Services → Git Gateway → Enable**.
4. Identity → **Invite users** → enter the email addresses for whoever will post (e.g., Mike). They get an email, set a password, and can log in.
5. Go to `https://insights.capturebridgefederal.com/admin`, log in, and publish. Each publish commits a Markdown file and Netlify rebuilds automatically.

With `publish_mode: editorial_workflow` (already set), posts move through Draft → In review → Ready before going live.

---

## Phase 2 (better SEO): serve it at capturebridgefederal.com/insights

A subdirectory on the main domain consolidates SEO authority better than a subdomain. Once the subdomain version is working, you can switch:

1. In `astro.config.mjs`, set `base: '/insights'` and `site: 'https://capturebridgefederal.com'`.
2. Update `site_url`/`display_url` in `public/admin/config.yml` and the `Sitemap:` line in `public/robots.txt` accordingly.
3. On the **main** site (the hand-built one), add a Netlify proxy so `/insights/*` serves this site. In the main site's `netlify.toml` or `_redirects`:

   ```
   /insights/*  https://insights.capturebridgefederal.com/insights/:splat  200
   ```

   (Adjust to your final URLs.) This keeps everything on capturebridgefederal.com for search engines while the two sites build independently.

---

## Writing a post (without the CMS)

Create `src/content/insights/my-post.md`:

```markdown
---
title: "Your question-style headline"
description: "1-2 sentence direct answer. This is what AI engines may quote."
author: "Michael Downey"
role: "Principal, Federal Business Development & Capture"
pubDate: 2026-06-25
tags: ["Capture", "GovCon"]
draft: false
---

<div class="answer-first"><strong>Short answer:</strong> ...</div>

## A section
Body text...
```

GEO tips baked into the template: answer-first intro, visible publish/updated dates, named author with a LinkedIn link in the schema, and clean Article + Organization JSON-LD. Refresh older posts and set `updatedDate` quarterly to keep them citable.
