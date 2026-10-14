# Delivery Report — Demo-Loop Prototype

**Agent:** Delivery  
**Date:** 2026-10-12  
**Scope:** `demo-loop/` only. Main `Website/index.html` not touched.

---

## Files in this deliverable

| File | Status |
|---|---|
| `demo-loop/01-strategy.md` | Written by Strategist agent |
| `demo-loop/02-design.md` | Written by Design Director agent |
| `demo-loop/index.html` | Built by Developer agent (701 lines) |
| `demo-loop/run-demo.sh` | Orchestration script (not re-run) |
| `demo-loop/delivery-done.md` | This file |

## How to preview

Open `demo-loop/index.html` directly in any modern browser. No server required. The hero image loads from `../Video/Generated image 1 (1).png` — asset confirmed present. If the browser blocks local file access to parent directories, serve with:

```
cd /Users/a2021/Desktop/x/pccs-proposal/Website
python3 -m http.server 8080
```

Then open `http://localhost:8080/demo-loop/index.html`.

---

## Verification against requirements

### Isolation — main site untouched
`demo-loop/index.html` contains zero references to `../index.html` or any main-site paths. Hero image is the only cross-directory asset (`../Video/…`). ✓

### Section 1 — Hero

| Requirement | Result |
|---|---|
| Full-viewport height (`100svh`, min 600px) | ✓ |
| Hero image overlay at 0.48 opacity with `--deep` fallback | ✓ (`onerror` fallback present) |
| Gradient scrim (deep → transparent) | ✓ |
| H1 `clamp(54px, 7.2cqw, 128px)` weight 300, `−0.04em` tracking | ✓ |
| Sub-headline `clamp(17px, 1.55cqw, 27px)` at 68% white | ✓ |
| Bursa badge — frosted glass, mint label, white value | ✓ |
| Entrance animations: bg scale, H1 fade-up, sub, badge | ✓ |
| `prefers-reduced-motion` guard on all animations | ✓ (wrapped in `@media (prefers-reduced-motion: no-preference)`) |
| EN / CN language toggle with `data-lang` on `<html>` | ✓ |
| Noto Sans SC loaded for Chinese | ✓ |

### Section 2 — Engineering Preview

| Requirement | Result |
|---|---|
| 2-column grid desktop, 1-column mobile (`< 1024px`) | ✓ |
| Eyebrow → H2 intro → lead body → 7-step chain → CTA | ✓ |
| Chain rows: index · name · verb; top/bottom dividers | ✓ |
| Stats grid 2×2; bordered cells; `--green` numbers | ✓ |
| Count-up animation via `IntersectionObserver` | ✓ |
| Reduced-motion: count-up skipped, final values shown | ✓ |
| Scroll reveal (`.rv` + `.visible`) staggered 60ms | ✓ |
| CTA button `--green` fill, arrow gap-expands on hover | ✓ |
| Image placeholder (`var(--sand)` div) below stats | ✓ |

### Accessibility

| Check | Result |
|---|---|
| `<section aria-label>` on both sections | ✓ |
| Bursa badge `role="complementary"` | ✓ |
| Lang toggle `role="group"` + `aria-pressed` | ✓ |
| Chain steps in `<ol>` | ✓ |
| Stat spans include `aria-label` (e.g. "50 plus") | ✓ |
| Hero image has `role="presentation"` (decorative) | ✓ |

### Copy — verified against `Copysheet/Website Copy PCCS Group.pdf`

| Element | Prototype | PDF | Match |
|---|---|---|---|
| H1 EN | "Engineering Future" | "Engineering Future" | ✓ |
| H1 CN | "以工程，创造可能。" | "以工程，创造可能。" | ✓ |
| Sub EN | "The world wears our work." | "The world wears our work." | ✓ |
| Sub CN | "世界穿着我们的作品。" | "世界穿着我们的作品。" | ✓ |
| Eyebrow EN | "The Engineering — a preview" | matches PDF section header | ✓ |
| Eyebrow CN | "工程能力预览" | "工程能力预览" | ✓ |
| Intro EN | "You bring the concept; we engineer everything after it." | "You bring the concept. We engineer everything after it." | ⚠ Semicolon vs. period |
| Lead body EN | "Fibre to finished mark. One system, one hand." | "Fibre → development → the mark → made at scale." | ⚠ Paraphrase (from strategy doc) |
| 7 chain steps | All match PDF § The Engineering (p. 3) | | ✓ |
| Stats (50+, 100+, 1,800, 67,000) | Matches PDF pp. 2 & 4 | | ✓ |

---

## Issues flagged

### Minor copy deviations (prototype vs. PDF)
1. **Intro sentence**: prototype uses a semicolon ("concept; we") where the PDF uses a full stop ("concept. We"). The strategy doc (`01-strategy.md`) introduced the semicolon variant. Head of Copy should align to PDF before any non-demo use.
2. **Lead body**: "Fibre to finished mark. One system, one hand." is a synthesis phrase not present in the PDF. PDF text is "Fibre → development → the mark → made at scale." Revert to PDF wording before publishing.

### NEEDS PCCS INPUT (carried from strategy)
- Confirm 50+, 100+, 1,800, 67,000 figures are current and cleared for publication.
- Confirm `Video/Generated image 1 (1).png` is approved for use beyond internal demos.

---

## What is NOT in scope here

The following were deliberately excluded from this two-section demo:

- Navigation, business tiles, recognition section, teasers, footer
- Any inner-page content
- GitHub push, deployment, or CMS integration

These remain in the main `Website/index.html` prototype (separate file, separate task).

---

## Recommended next step

**Head of Copy** — resolve the two lead-body copy deviations against the PDF, then the prototype is ready for a live browser walkthrough with the client.
