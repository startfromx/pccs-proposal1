# Demo Strategy Handoff — Two Homepage Sections

**Scope:** standalone prototype only (`demo-loop/index.html`). Do not touch the main `index.html`.

---

## Section 1 — Hero: "Engineering Future"

### Goal
Establish PCCS as an engineering-led group in the first second. The visitor should feel they have entered a precision manufacturing company, not a generic factory.

### Approved copy (verify each line against `Copysheet/Website Copy PCCS Group.pdf`)

| Element | English | Chinese |
|---|---|---|
| H1 | Engineering Future | 以工程，创造可能。 |
| Sub-headline | The world wears our work. | 世界穿着我们的作品。 |
| Bursa badge label | Bursa Malaysia · 6068 | — |
| Bursa badge value | PCCS Group Berhad | PCCS 集团有限公司 |

Source: `content/approved-copy.md` §Core positioning; `index.html:544–558` for implemented form.

### Design requirements
- Full viewport height (`100svh`, min 600 px).
- Background: `--deep` (#12291F) with editorial photography overlay at reduced opacity (~0.48). Use existing asset `Video/Generated image 1 (1).png` or leave a placeholder `<div>` if the asset path differs in the demo folder.
- Gradient scrim from `--deep` at the bottom to near-transparent at the top (text legibility).
- H1: `display` class — weight 300, very large (`clamp(54px, 7.2cqw, 128px)`), white, letter-spacing −0.04em, bottom-aligned.
- Sub-headline: weight 300, ~`clamp(17px, 1.55cqw, 27px)`, white at 68% opacity.
- Bursa badge: bottom-right, frosted-glass card, `--mint` (#8AFFD7) label, white value text.
- Entrance animation: bg scale-in (1.08 → 1) on load, H1 fade+translateY up (delay 0.55s), sub-headline (delay 0.8s), badge (delay 1.3s). Honor `prefers-reduced-motion`.
- Language toggle: EN / CN pill buttons; switching swaps `.en`/`.cn` spans via `data-lang` on `<html>`. Chinese uses `Noto Sans SC`.

---

## Section 2 — The Engineering Preview

### Goal
Demonstrate PCCS's end-to-end capability before the visitor reaches the full Engineering page. Show breadth and statistics; give one clear next action.

### Approved copy (verify against PDF)

| Element | English | Chinese |
|---|---|---|
| Eyebrow | The Engineering — a preview | 工程能力预览 |
| Intro | You bring the concept; we engineer everything after it. | 你负责概念，我们兑现一切。 |
| Lead body | Fibre to finished mark. One system, one hand. | 纤维 → 开发 → 标识 → 量产，一站式全程包办。 |
| CTA | See the full engineering → | 了解完整工程能力 → |

**Capability chain (7 steps):**

| # | English | Chinese | Verb EN | Verb CN |
|---|---|---|---|---|
| 01 | Design & tech spec | 设计与技术规格 | Engineered | 由我们制定 |
| 02 | Fabric development | 面料开发 | Developed | 由我们研发 |
| 03 | Pattern & sample | 纸样与样品 | Prototyped | 由我们打造 |
| 04 | The mark & trims | 标识与辅料 | Crafted | 由我们制作 |
| 05 | Testing & compliance | 测试与合规 | Verified | 由我们把关 |
| 06 | Make & QC | 生产与质检 | Manufactured | 由我们执行 |
| 07 | Finish & deliver | 后整与交付 | Delivered | 由我们交付 |

Source: `index.html:684–731`

**Statistics (4 cells, 2×2 grid):**

| Stat | EN label | CN label |
|---|---|---|
| 50+ | Patents | 专利 |
| 100+ | R&D Staff | 研发人员 |
| 1,800 | Styles / yr | 款 / 年 |
| 67,000 | Samples / yr | 样品 / 年 |

Source: `index.html:745–772`. **NEEDS PCCS INPUT:** confirm these figures are current and approved for publication.

### Design requirements
- Background: `--cream` (#F5F1E8).
- Two-column grid on desktop (`1fr 1fr`, gap 72px); single column on mobile.
- Left column: eyebrow → intro (`h2`-weight, weight 300, ~`clamp(20px, 2.2cqw, 38px)`) → lead body → numbered chain list → CTA button.
- Chain list: horizontal rows with index number (muted), step name, and action verb (uppercase, `--green`). Top and bottom 1px `var(--line)` dividers.
- Right column: 2×2 stats box (bordered grid, stat numbers in `--green`, large bold) → supporting image placeholder.
- CTA button: `--green` fill, white text, arrow that shifts right on hover.
- Scroll-reveal: each chain row and stats box fades in with staggered `--rv-d` delay; honor `prefers-reduced-motion`.
- Count-up animation on stats numbers (from 0 to target) triggered on IntersectionObserver entry. Respect reduced-motion (skip animation, show final value).

---

## Shared design tokens (replicate from main site)

```
--green:   #2E6451
--pine:    #1B3A2E
--deep:    #12291F
--mint:    #8AFFD7
--cream:   #F5F1E8
--sand:    #E7DFCD
--stone:   #8E877A
--stonedk: #6E685D
--ink:     #1C1C1A
```

Typefaces: `Inter` (EN), `Noto Sans SC` (CN) — both from Google Fonts.

---

## Open questions / NEEDS PCCS INPUT

- Confirm 50+, 100+, 1800, 67000 statistics are current and cleared for publication.
- Confirm hero photography: is `Video/Generated image 1 (1).png` approved for use in the demo, or should it be a placeholder?
- Final navigation labels require Manager + user approval before shipping.

---

## Recommended next agent

**Design Director** — pick up `demo-loop/01-strategy.md`, specify exact layout, typography scale, spacing, and one restrained scroll animation for these two sections. Output to `demo-loop/02-design.md`.
