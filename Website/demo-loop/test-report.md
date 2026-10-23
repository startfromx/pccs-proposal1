# Test Report — Demo-Loop Prototype

**Tester:** QA Agent  
**Date:** 2026-10-12  
**Scope:** `demo-loop/index.html` (701 lines), reviewed against `delivery-done.md` and source code.  
**Method:** Static code review — HTML structure, CSS logic, JavaScript correctness, accessibility attributes, copy, and responsive rules. No live browser run; dynamic behaviour assessed by reading the code.

---

## Overall Verdict

**Conditional pass.** Two bugs require fixes before a client-facing demo; both are one-liners. Two copy deviations (flagged by the Delivery agent) are confirmed. All other delivery claims check out.

---

## Bugs — Must Fix Before Client Demo

### BUG-01 · `lang` attribute not updated on language switch *(not in delivery report)*

**Severity: High (accessibility)**

`setLang()` (line 637–641) updates `data-lang` on `<html>` but leaves the `lang="en"` attribute unchanged when switching to Chinese.

```js
// current — only sets data-lang
document.documentElement.dataset.lang = lang;

// missing — without this, screen readers keep English pronunciation for Chinese text
document.documentElement.lang = lang === 'zh' ? 'zh' : 'en';
```

Screen readers select pronunciation rules from the `lang` attribute, not from `data-lang`. In Chinese mode the current build announces Chinese characters with an English engine.

**Fix:** Add `document.documentElement.lang = lang === 'zh' ? 'zh' : 'en';` inside `setLang()`.

---

### BUG-02 · Hero text and Bursa badge overlap on mobile *(not in delivery report)*

**Severity: Medium (layout)**

At the `≤ 639px` breakpoint (lines 422–440), `.hero__text` is set to `bottom: 48px; left: 24px; right: 24px` — spanning nearly the full viewport width. `.bursa-badge` is also set to `bottom: 48px; right: 24px`. Both share the same `bottom` value, so the badge is anchored at the same vertical baseline as the bottom of the hero text block. On a 375px screen the two absolutely-positioned elements collide.

**Fix:** Push the badge down or reposition it. One option at `≤ 639px`: set `.hero__text { bottom: 120px; }` so text sits above the badge, or move the badge to the top-right at mobile (beside the language toggle).

---

## Confirmed Delivery Report Flags

### COPY-01 · Intro sentence: semicolon vs. full stop

| | Text |
|---|---|
| Prototype (line 500) | `You bring the concept; we engineer everything after it.` |
| PDF | `You bring the concept. We engineer everything after it.` |

Confirmed. The semicolon was introduced in `01-strategy.md` and carried through. Revert to PDF wording.

### COPY-02 · Lead body: synthesis phrase not in PDF

| | Text |
|---|---|
| Prototype (line 505) | `Fibre to finished mark. One system, one hand.` |
| PDF | `Fibre → development → the mark → made at scale.` |

Confirmed. Head of Copy must revert to exact PDF wording before any external use.

---

## Code Review — No New Issues Found

### HTML structure
- Both sections use `<section aria-label>`. ✓
- Chain steps in `<ol>`. ✓
- Decorative hero image: `alt=""` + `role="presentation"`. ✓ (Both are redundant but harmless.)
- Bursa badge: `<aside role="complementary">` — `role` is the implicit role of `<aside>`; harmless duplication. ✓
- `onerror` fallback on hero image swaps in a solid `--pine` div. ✓

### CSS
- Hero `container-type: inline-size` correctly scopes `cqw` units for H1 and eng-intro. ✓
- Stats grid border approach (border-right/bottom on cells, not gap) avoids double-border. ✓
- `will-change: transform` on `.hero__photo` scoped correctly to the animated element. ✓
- All animations wrapped in `@media (prefers-reduced-motion: no-preference)`. ✓
- When reduced-motion is active, `.rv` elements have no `opacity: 0` initial state — they're visible immediately. ✓

### JavaScript
- `setLang()` `aria-pressed` values: `lang === 'en'` produces a boolean coerced to `"true"/"false"` string. Valid for `aria-pressed`. ✓
- Count-up easing: `1 - Math.pow(1 - progress, 3)` is a correct ease-out cubic; converges exactly to target at `progress = 1`. ✓
- Count-up format: `50+` and `100+` use `data-suffix`; `1,800` and `67,000` use `data-comma="true"` with `toLocaleString('en-US')`. Final output matches displayed text. ✓
- Reduced-motion check uses `prefers-reduced-motion: reduce` (the correct polarity). When true, final values are set immediately without animation. ✓
- `IntersectionObserver` calls `unobserve` after triggering — count-up and reveal each fire once only. ✓
- `aria-label` on stat spans is static ("50 plus", "100 plus", "1800", "67000"); `textContent` animates independently. Screen readers announce the static label, not intermediate values. ✓

### Minor observations (no action required for demo)

| | |
|---|---|
| CTA `href="#"` (line 589) | Clicking scrolls to page top. Acceptable for a prototype; use a real URL before shipping. |
| Tablet gap 640–1023px | Hero text `right: 280px` leaves ~296px text width at 640px — H1 will wrap. Tight but readable at 54px minimum. Acceptable for demo. |
| `aria-label` vs displayed stat text | `aria-label="1800"` while display shows `1,800`; `aria-label="67000"` vs `67,000`. Functionally fine; a future pass should align these. |

---

## NEEDS PCCS INPUT (carried, not resolved)

- Stats figures (50+, 100+, 1,800, 67,000): confirm current and cleared for publication.
- `Video/Generated image 1 (1).png`: confirm approved beyond internal demos.

---

## Summary Table

| ID | Category | Status | Action |
|---|---|---|---|
| BUG-01 | Accessibility | **Fail** | Add `lang` update in `setLang()` |
| BUG-02 | Layout / Mobile | **Fail** | Fix mobile badge/text overlap |
| COPY-01 | Copy | **Fail** | Revert semicolon to full stop |
| COPY-02 | Copy | **Fail** | Revert lead body to PDF text |
| HTML structure | Semantic / A11y | Pass | — |
| CSS logic | Correctness | Pass | — |
| JS count-up | Correctness | Pass | — |
| JS scroll-reveal | Correctness | Pass | — |
| Reduced-motion (CSS) | A11y | Pass | — |
| Reduced-motion (JS) | A11y | Pass | — |
| Image fallback | Resilience | Pass | — |
| Responsive (desktop) | Layout | Pass | — |
| Responsive (mobile) | Layout | Fail — BUG-02 | — |
| Copy (chain steps, stats, H1) | Copy | Pass | — |
