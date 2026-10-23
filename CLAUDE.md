# PCCS Website — Agent Instructions

## Start here — read these files first

Before writing a single line of code, read in this exact order:

1. `Website/AGENTS.md` — project rules and approval gates
2. `Website/PROJECT-COORDINATOR.md` — current status, live pages, link map
3. `Website/planning/PCCS-website-requirements.md`
4. `Website/planning/PCCS-global-components.md`
5. `Website/planning/PCCS-visual-direction-brief.md`
6. `Website/agents/page-implementation-prompt.md` — page build template
7. `Website/Copysheet/Website Copy PCCS Group.pdf` — approved copy (source of truth)
8. Your assigned page file (current state — see assignment below)
9. `Website/download code/pccs-proposal1-main/option1/assets/css/pccs.css` — global design system

## Project

PCCS Group corporate website. Working directory:
`Website/download code/pccs-proposal1-main/option1/`

All paths below are relative to that directory unless stated otherwise.

## Your page assignment

Run this to identify your page:

```bash
git branch --show-current
```

| Branch | Your file |
|---|---|
| `main` | `index.html` |
| `pccs-sustainability` | `pages/sustainability.html` |
| `pccs-engineering` | `pages/engineering.html` |
| `pccs-our-work` | `pages/our-work.html` |
| `pccs-group` | `pages/group.html` |
| `pccs-investors` | `pages/investors.html` |
| `pccs-careers` | `pages/careers.html` |

## Shared files — do not modify

These are owned by `main`. Read them, use them, never edit them:

- `assets/css/pccs.css` — all tokens, nav, footer, glass, motion
- `assets/css/pccs-pages.css` — standalone-page layout primitives
- `assets/js/pccs-home.js` — global nav injection + i18n + scroll behaviour
- `assets/js/pccs-pages.js` — standalone-page behaviour

If you need a shared file change, flag it as `NEEDS SHARED FILE UPDATE: [description]` in your report. Do not edit the file.

## Global design system (already built — reuse, don't reinvent)

- **Nav**: injected automatically by `pccs-home.js` — do not add nav HTML to your page
- **Fonts**: loaded by `pccs.css` `@import` — do not add Google Fonts `<link>` tags
- **Font weight**: display headings use `font-weight:400` (Inter Regular) — match this
- **Colour tokens**: `--ink`, `--cream`, `--green:#006450`, `--red:#D84236`, `--grey`
- **Reveal**: add class `rv` to elements; JS handles intersection + `in` class
- **Parallax**: add `data-parallax="base,max,drift%"` to images inside `.parallax-img`

## Page shell

Every page must have:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>[Page Name] · PCCS Group</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="../assets/css/pccs.css">
  <link rel="stylesheet" href="../assets/css/pccs-pages.css">
</head>
<body class="[page-slug]-page">
  <div class="page">
    <!-- hero, sections -->
  </div>
  <script src="../assets/js/pccs-home.js"></script>
  <script src="../assets/js/pccs-pages.js"></script>
</body>
</html>
```

No nav HTML — it is injected by `pccs-home.js`.

## Copy rules

- Copy source of truth: `Website/Copysheet/Website Copy PCCS Group.pdf`
- Do not invent facts, figures, certifications, or claims
- Mark missing information as `NEEDS PCCS INPUT`
- Do not change approved copy

## Approval gates

Stop and ask before: changing approved copy, adding investor/sustainability claims, financial data, customer logos, or deploying.

## When done

1. Test desktop, tablet, mobile
2. Test nav links and language switcher
3. Test keyboard focus and reduced motion
4. Commit to your branch
