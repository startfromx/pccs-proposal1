# Design Specification — Demo Sections 1 & 2

**Author:** Design Director  
**Input:** `demo-loop/01-strategy.md`  
**Output consumed by:** Frontend Engineer (`demo-loop/index.html`)

---

## Design tokens (shared)

Replicate verbatim from the main site. No new tokens introduced.

```css
--green:   #2E6451;
--pine:    #1B3A2E;
--deep:    #12291F;
--mint:    #8AFFD7;
--cream:   #F5F1E8;
--sand:    #E7DFCD;
--stone:   #8E877A;
--stonedk: #6E685D;
--ink:     #1C1C1A;

/* Derived */
--line:    rgba(46,100,81,.15);   /* 1 px divider */
--glass-bg: rgba(18,41,31,.52);  /* frosted overlay base */
```

Typefaces: `Inter` (EN), `Noto Sans SC` (CN). Load both via one `<link>` at the top of `index.html`; weights 300, 400, 700.

---

## Section 1 — Hero: "Engineering Future"

### Layout

```
┌──────────────────────────────────────────────────────────┐
│  [lang pill — top-right, 20px from edges]                │
│                                                          │
│                                                          │
│  [photo layer — position:absolute, inset 0, z 0]        │
│  [gradient scrim — position:absolute, inset 0, z 1]     │
│                                                          │
│                                         [Bursa badge]   │
│  H1                                                      │
│  Sub-headline                                            │
└──────────────────────────────────────────────────────────┘
```

- Container: `position: relative; height: 100svh; min-height: 600px; overflow: hidden; background: var(--deep);`
- Text block: `position: absolute; bottom: 64px; left: 64px; right: 280px;` — leaves room for badge on the right.
- Mobile (`< 640px`): `bottom: 48px; left: 24px; right: 24px;` — badge moves to `bottom: 48px; right: 24px;` but above text.

### Photography overlay

- `<img>` or `<div>` with `background-image`, `position: absolute; inset: 0; object-fit: cover; opacity: 0.48; z-index: 0;`
- Asset: `../Video/Generated image 1 (1).png` (relative path from `demo-loop/`). If missing, substitute a `background-color: var(--pine)` div.

### Gradient scrim

```css
background: linear-gradient(
  to top,
  var(--deep) 0%,
  rgba(18,41,31,.72) 28%,
  rgba(18,41,31,.18) 64%,
  transparent 100%
);
position: absolute; inset: 0; z-index: 1;
```

### Typography — Section 1

| Element | Size | Weight | Color | Tracking |
|---|---|---|---|---|
| H1 "Engineering Future" | `clamp(54px, 7.2cqw, 128px)` | 300 | `#fff` | `−0.04em` |
| Sub-headline | `clamp(17px, 1.55cqw, 27px)` | 300 | `rgba(255,255,255,.68)` | `0` |
| Bursa label ("Bursa Malaysia · 6068") | `11px` | 400 | `var(--mint)` | `0.08em` uppercase |
| Bursa value ("PCCS Group Berhad") | `14px` | 400 | `#fff` | `0` |

- H1 line-height: `0.92` (tight, editorial).
- Sub-headline: `margin-top: 18px; line-height: 1.45;`
- Chinese H1 (`.cn span`): same size + weight; `font-family: 'Noto Sans SC', sans-serif;` from `data-lang` on `<html>`.

### Bursa badge

```
position: absolute; bottom: 64px; right: 64px; z-index: 3;
padding: 14px 20px;
background: var(--glass-bg);
backdrop-filter: blur(12px) saturate(1.4);
border: 1px solid rgba(138,255,215,.18);
border-radius: 10px;
min-width: 180px;
```

Mobile: `bottom: 48px; right: 24px;`

### Language pill toggle

```
position: absolute; top: 20px; right: 20px; z-index: 4;
display: flex; gap: 4px;
padding: 4px; background: rgba(255,255,255,.10);
border-radius: 100px;
```

Each pill: `padding: 6px 16px; border-radius: 100px; font-size: 13px; font-weight: 400;`  
Active pill: `background: var(--mint); color: var(--deep);`  
Inactive: `color: rgba(255,255,255,.65);`

---

## Section 2 — The Engineering Preview

### Layout

Desktop (`≥ 1024px`):
```
┌───────────────────────┬───────────────────────┐
│  Left column          │  Right column         │
│  (1fr)                │  (1fr)                │
│                       │                       │
│  Eyebrow              │  2×2 Stats grid       │
│  H2 intro             │                       │
│  Lead body            │  Image placeholder    │
│  Chain list           │                       │
│  CTA                  │                       │
└───────────────────────┴───────────────────────┘
```

- Section padding: `120px 64px` desktop → `80px 24px` mobile.
- Grid: `display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start;`
- Mobile: `grid-template-columns: 1fr;` (right column stacks below).

### Typography — Section 2

| Element | Size | Weight | Color |
|---|---|---|---|
| Eyebrow ("The Engineering — a preview") | `12px` uppercase | 400 | `var(--stone)` tracking `0.12em` |
| H2 intro | `clamp(20px, 2.2cqw, 38px)` | 300 | `var(--ink)` |
| Lead body | `clamp(15px, 1.1cqw, 18px)` | 300 | `var(--stonedk)` |
| Chain index (01–07) | `12px` | 400 | `var(--stone)` |
| Chain step name | `15px` | 400 | `var(--ink)` |
| Chain verb (ENGINEERED…) | `11px` uppercase | 700 | `var(--green)` tracking `0.08em` |
| Stats number | `clamp(36px, 3.5cqw, 60px)` | 700 | `var(--green)` |
| Stats label | `13px` | 400 | `var(--stone)` |
| CTA button | `15px` | 400 | `#fff` on `var(--green)` |

- H2 line-height: `1.2`. Lead body: `1.6`. Chain rows: `1`.

### Chain list

```
margin-top: 36px;
border-top: 1px solid var(--line);
```

Each row:
```
display: grid;
grid-template-columns: 28px 1fr auto;
align-items: center;
gap: 16px;
padding: 14px 0;
border-bottom: 1px solid var(--line);
```

- Index: left, `var(--stone)`.
- Step name: centre column, `var(--ink)`.
- Verb: right, `var(--green)` uppercase.

### Stats grid (right column)

```
display: grid;
grid-template-columns: 1fr 1fr;
border: 1px solid var(--sand);
border-radius: 12px;
overflow: hidden;
```

Each cell:
```
padding: 32px 28px;
border-right: 1px solid var(--sand);   /* remove on right cells */
border-bottom: 1px solid var(--sand);  /* remove on bottom cells */
```

Top-left and bottom-right cells: no extra rule needed. Remove right border from cells in column 2, bottom border from row 2 cells.

Image placeholder below stats: `margin-top: 24px; height: 220px; background: var(--sand); border-radius: 12px;`

### CTA button

```
display: inline-flex; align-items: center; gap: 10px;
margin-top: 36px;
padding: 14px 28px;
background: var(--green); color: #fff;
border-radius: 6px; font-size: 15px;
transition: gap 0.2s ease;
```

Hover: `gap: 18px;` (arrow shifts right, no transform needed).

---

## Spacing rhythm

| Token name | Value | Usage |
|---|---|---|
| `--sp-xs` | `8px` | Pill gap, badge inner |
| `--sp-sm` | `16px` | Chain row gap, inline spacing |
| `--sp-md` | `24px` | Mobile section padding sides |
| `--sp-lg` | `36px` | Chain top margin, CTA margin |
| `--sp-xl` | `64px` | Hero text bottom, desktop section sides |
| `--sp-2xl` | `72px` | Column gap |
| `--sp-3xl` | `120px` | Desktop section top/bottom padding |

---

## Animation — one restrained idea: "Precision Reveal"

**Concept:** Chain rows and stats cells don't simply fade in — each slides up 20px and fades from opacity 0 to 1. The motion distance is small (20px), the easing is `cubic-bezier(0.22,1,0.36,1)` (fast decelerate), and stagger is tight (60ms per row). This reads as precision, not drama.

### Implementation spec

```css
@media (prefers-reduced-motion: no-preference) {
  .rv {
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.55s cubic-bezier(0.22,1,0.36,1),
      transform 0.55s cubic-bezier(0.22,1,0.36,1);
    transition-delay: var(--rv-d, 0ms);
  }
  .rv.visible {
    opacity: 1;
    transform: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .rv { opacity: 1; transform: none; }
}
```

Apply `class="rv"` and `style="--rv-d: Xms"` to:
- Each `.chain-row` — delay 0ms, 60ms, 120ms … 360ms.
- `.stats-grid` — delay 200ms.
- Image placeholder — delay 320ms.

Trigger: `IntersectionObserver` with `threshold: 0.15` adds `.visible` once.

**Hero entrance** (Section 1): separate — bg `scale(1.08)→scale(1)` over 1.4s `ease-out` on load; H1 `translateY(24px)→0 + opacity` at 0.55s delay; sub-headline at 0.8s; badge at 1.3s. All durations 0.7s except bg (1.4s). Reduced-motion: skip all.

---

## Responsive breakpoints

| Breakpoint | Behaviour |
|---|---|
| `< 640px` (mobile) | Hero text/badge repositioned to 24px edges; Section 2 single column; stats grid stays 2×2 but cells pad to 20px |
| `640px – 1023px` (tablet) | Section 2 stays single column; hero clamp sizes naturally reduce; badge stays bottom-right |
| `≥ 1024px` (desktop) | Full two-column grid; all clamp sizes at or near maximum |

---

## Accessibility notes

- `<section aria-label="Engineering Future hero">` and `<section aria-label="Engineering preview">`.
- Bursa badge: `role="complementary" aria-label="Stock listing"`.
- Language toggle: `role="group" aria-label="Language"` with `aria-pressed` on each pill.
- Chain list: `<ol>` with `<li>` — semantic ordering conveys sequence.
- Stats numbers: wrap in `<span aria-label="50 plus">50+</span>` so screen readers don't read "fifty plus" as arithmetic.
- Color contrast: white on `--deep` → 14.4:1 ✓. `--green` text on `--cream` → 5.8:1 ✓. `--stone` text on `--cream` → 3.4:1 (decorative only; body copy uses `--stonedk` → 4.6:1 ✓).

---

## Open questions passed to Frontend Engineer

- Confirm asset path resolves from `demo-loop/`: `../Video/Generated image 1 (1).png`. If not, use `var(--pine)` placeholder div.
- Stats figures (`50+`, `100+`, `1,800`, `67,000`) are marked **NEEDS PCCS INPUT** — count-up animation should target these values but they must be confirmed before demo ships.
