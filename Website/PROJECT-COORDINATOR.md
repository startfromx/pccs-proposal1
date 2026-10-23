# PCCS Website Project Coordinator

## Purpose

This file is the shared project status and handoff record.

## Agent ownership

- Manager: coordinates work and updates this file.
- Strategist: website goals, audiences, and sitemap.
- Head of Copy: copy quality, voice, and approvals.
- Copywriter: copy drafts and alternatives.
- Design Director: visual direction, design system, and page specifications.
- Developer: implementation.
- QA Reviewer: responsive, accessibility, and functional testing.

## Source priority

1. Final PCCS copy PDF
2. Approved project decisions
3. PCCS brand memory
4. Approved design specifications
5. Agent suggestions

## Current status

- Final copy PDF: available in `Copysheet/`
- Existing assets: available in `Video/`
- Sitemap: initial draft
- Design system: initial draft
- Page specifications: initial draft
- Development: inspect existing source before editing
- QA: not started

## Approval gates

Human approval is required before changing approved copy, investor or sustainability claims, adding financial data or customer logos, pushing to GitHub, or deploying.

## Handoff format

Every agent reports what it reviewed, what it produced, files changed, unresolved questions, `NEEDS PCCS INPUT` items, and the recommended next agent.

## Current implementation structure

- Home source: download code/pccs-proposal1-main/option1/index.html
- Shared styles: download code/pccs-proposal1-main/option1/assets/css/pccs.css
- Standalone-page styles: download code/pccs-proposal1-main/option1/assets/css/pccs-pages.css
- Home behavior: download code/pccs-proposal1-main/option1/assets/js/pccs-home.js
- Standalone-page behavior: download code/pccs-proposal1-main/option1/assets/js/pccs-pages.js
- Independent page work files: download code/pccs-proposal1-main/option1/pages/

Page specialists should work in their assigned page file. The Manager owns shared CSS, shared JavaScript, navigation, approved copy, and integration back into Home.

## Live pages and link map (2026-10-15)

These pages are approved and navigable. All nav links must use these exact paths.

| Page | File (from option1 root) | Branch | Status |
|---|---|---|---|
| Home | index.html | main | Live |
| Sustainability | pages/sustainability.html | pccs-sustainability | Live |
| What We Do | pages/engineering.html | pccs-engineering | In progress |
| Our Work | pages/our-work.html | pccs-our-work | In progress |
| Our Group | pages/group.html | pccs-group | In progress |
| Investors | pages/investors.html | pccs-investors | In progress |
| Careers | pages/careers.html | pccs-careers | In progress |

### Nav link rules

- From `index.html`: page links use `pages/<file>.html`; same-page section anchors use `#sectionId`
- From `pages/*.html`: Home is `../index.html`; page siblings are `<file>.html` (no path prefix); Home sections are `../index.html#sectionId`
- Story has no dedicated page yet — links to `#story` / `../index.html#story` until a Story page is built
- Unbuilt pages may keep their `href` target but should not be linked from live navigation until merged into main
