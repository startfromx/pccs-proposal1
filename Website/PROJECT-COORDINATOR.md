# PCCS Website — Project Coordinator

_Last updated: 2026-11-26_

## Quick start for a new agent

Read in this order before touching any file:
1. `../CLAUDE.md` — branch → page assignment, shared file rules, design system
2. This file — current page status and what needs doing
3. `DECISIONS.md` — approved decisions that persist across AI sessions
4. `planning/PCCS-visual-direction-brief.md` — visual tone
5. `planning/PCCS-global-components.md` — nav, footer, shared patterns
6. Your assigned page file (current state)
7. `download code/pccs-proposal1-main/option1/assets/css/pccs.css` — design tokens

---

## Copy source of truth

> **The HTML files are now the source of truth for copy.**
> `Copysheet/Website Copy PCCS Group.pdf` is outdated — do not use it to override existing page copy.
> If copy is missing or marked `NEEDS PCCS INPUT`, flag it; do not invent it.

---

## Implementation structure

| Asset | Path (from repo root) |
|---|---|
| Working directory | `Website/download code/pccs-proposal1-main/option1/` |
| Home | `index.html` |
| Pages | `pages/<name>.html` and `pages/<name>-cn.html` |
| Global CSS | `assets/css/pccs.css` |
| Page CSS | `assets/css/pccs-pages.css` |
| Global JS | `assets/js/pccs-home.js` — injects nav + footer, i18n, scroll |
| Page JS | `assets/js/pccs-pages.js` — page-level behaviour |

**Shared files are owned by `main`. Never edit them from a page branch.**
Flag needed changes as `NEEDS SHARED FILE UPDATE: [description]`.

---

## Page status (2026-11-05)

| Page | EN file | CN file | Branch | Status |
|---|---|---|---|---|
| Home | `index.html` | `cn.html` | main | ✅ Live |
| Sustainability | `pages/sustainability.html` | `pages/sustainability-cn.html` | pccs-sustainability | ✅ Live |
| Our Group | `pages/group.html` | `pages/group-cn.html` | pccs-group | ✅ Built |
| Careers | `pages/careers.html` | `pages/careers-cn.html` | pccs-careers | ✅ Built |
| Investors | `pages/investors.html` | `pages/investors-cn.html` | pccs-investors | ✅ Built |
| Our Work | `pages/our-work.html` | `pages/our-work-cn.html` | pccs-our-work | ↪ Retired; files retained and redirected to Engineering |
| What We Do | `pages/engineering.html` | `pages/engineering-cn.html` | pccs-engineering | 🔧 In progress |
| Contact | `pages/contact.html` | `pages/contact-cn.html` | main | 🔧 Stub |

---

## Nav link rules

- From `index.html`: pages use `pages/<file>.html`; same-page anchors use `#sectionId`
- From `pages/*.html`: Home = `../index.html`; sibling pages = `<file>.html`; Home sections = `../index.html#sectionId`
- CN pages link to sibling `-cn.html` files; language switcher handled by `pccs-home.js`

---

## Approval gates

Stop and confirm with the user before:
- Changing any copy on a built page
- Adding investor, financial, or sustainability claims
- Adding customer logos or partner names
- Pushing to GitHub or deploying

---

## Agent ownership

| Role | Responsibility |
|---|---|
| Manager | Shared files, nav, integration, this coordinator file |
| Developer | Assigned page HTML only |
| QA | Responsive, accessibility, functional checks |

Each agent reports: files changed · decisions made · `NEEDS PCCS INPUT` items · recommended next step.
