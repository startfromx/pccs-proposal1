# PCCS Website QA Report

Date: 2026-10-16  
Reviewer: Codex QA  
Scope: Home plus six inner pages in `download code/pccs-proposal1-main/option1/`

## Status

Pass with known content and destination blockers. The implementation is present and the structural checks pass, but the site is not release-ready until placeholder destinations and pending content are resolved.

## Pages checked

- `index.html`
- `pages/engineering.html`
- `pages/our-work.html`
- `pages/group.html`
- `pages/sustainability.html`
- `pages/investors.html`
- `pages/careers.html`

## Passed checks

- All seven expected HTML files exist.
- All relative stylesheet, script, image, and page targets resolve to existing local files.
- Inner-page navigation contains the expected page set: Home, What We Do, Our Work, Our Group, Sustainability, Investors, and Careers.
- Google Fonts links for Inter and Noto Sans SC are present across the page set.
- `assets/js/pccs-home.js` passes `node --check`.
- `assets/js/pccs-pages.js` passes `node --check`.
- All inline page scripts pass JavaScript compilation checks.
- Home has the mobile-menu hook used by `pccs-home.js`.
- Inner pages have the `data-page-menu-toggle` / `data-page-menu` hooks used by `pccs-pages.js`.
- Scroll animation hooks are present through `IntersectionObserver`, page-specific reveal observers, parallax handlers, and reduced-motion guards.
- Sustainability page loads and visibly renders its hero, navigation, content sections, metrics, and community content in the available browser review.

## Findings

### QA-001 — Release blocker: placeholder links remain

Several links intentionally use `href="#"` or visibly display `NEEDS PCCS INPUT`. Examples include Home CTAs, Newsroom, headquarters links, investor documents, Bursa destination, and career destinations.

These are not broken local file paths, but they are incomplete user journeys and must be replaced before publication.

Affected areas include:

- `index.html`
- `pages/group.html`
- `pages/investors.html`
- `pages/careers.html`
- `pages/our-work.html`

### QA-002 — Verification limitation: exact Desktop file URL not fully exercised in the visible browser

The visible Chrome session switched to an Orca workspace copy under `/Users/a2021/orca/workspaces/...` while the requested QA URLs are under `/Users/a2021/Desktop/...`. Static checks were run against the requested Desktop worktree; visual browser observations were treated as supplementary only.

Before release, open each supplied Desktop `file:///` URL directly and repeat the desktop/mobile visual pass in the same source location.

### QA-003 — Accessibility/content cleanup recommended

Some decorative images intentionally use empty `alt` attributes, which is acceptable when they are truly decorative, but each should be confirmed as `aria-hidden` or otherwise excluded from the accessibility tree. Pending content labels are visible and should be replaced or retained intentionally during content approval.

## Not fully verified visually

- Mobile viewport layout and menu interaction at actual narrow widths
- Font network loading versus local fallback behavior
- Scroll-trigger timing on every page
- All image loading and visual consistency at the exact Desktop file URLs
- Keyboard-only navigation and focus return behavior

## Recommended release sequence

1. Replace approved `href="#"` destinations and `NEEDS PCCS INPUT` items.
2. Open the seven Desktop file URLs directly in one browser profile.
3. Test each page at desktop and mobile widths, including menu open/close and one scroll-reveal interaction.
4. Re-run this report after content and destination approval.
