# PCCS Visual Direction Brief

## Reference approach

Use Wolverine Worldwide as a reference for editorial pacing, image scale, spacious sections, restrained animation, floating glass panels, and premium typography. Do not copy its wording, code, assets, or exact page structure.

The PCCS copy sheet remains the source of truth for content, facts, metrics, claims, and sitemap.

## Reference study: editorial portfolio hero

The supplied Brands-page reference uses a white, gallery-like opening composition rather than a conventional full-bleed hero. Its useful design principles for PCCS are:

- Keep the first viewport mostly white and calm, with a generous perimeter around the navigation.
- Use a very large black editorial statement as the primary visual anchor.
- Arrange a small number of rectangular images as an intentionally irregular collage around and behind the statement.
- Mix image scales and leave visible gaps; the negative space is part of the composition.
- Let the headline overlap image tiles so typography and imagery read as one editorial system.
- Place the supporting paragraph lower in the composition, offset from the headline rather than directly beneath it.
- Use image opacity and scale differences to establish depth, while keeping the headline fully opaque and dominant.
- Keep navigation restrained: compact wordmark at left, simple text links at right, and one understated active state.

### PCCS translation rules

- Treat this as a reusable PCCS composition pattern, not a page-specific copy or asset layout.
- Use PCCS-approved imagery only; never reuse Wolverine imagery, logos, copy, or exact placement.
- Use a 12-column desktop grid with image tiles positioned within grid zones. Avoid unstructured random placement that becomes fragile at smaller widths.
- Limit the hero collage to approximately 10–16 tiles on desktop. Prioritize 5–8 tiles on tablet and 3–5 on mobile.
- Keep the headline readable above every image. If contrast drops, move the tile or reduce its opacity rather than adding a heavy overlay.
- On mobile, convert the collage into a controlled vertical rhythm: headline first, then a small image cluster, then supporting copy. Do not preserve desktop overlaps at the cost of legibility or horizontal overflow.
- Use slow, restrained entrance motion only: fade and 12–24px translate, with staggered tiles. Disable stagger and parallax under `prefers-reduced-motion: reduce`.
- Keep the hero height intentional. Desktop may use a tall editorial stage; mobile should resolve within a predictable scroll distance and must not hide the supporting copy below the fold indefinitely.

### Composition checklist

Before reusing this pattern on a PCCS page, confirm:

1. The page has one short, approved headline that can carry the composition.
2. The image set represents PCCS work or capability, not generic decoration.
3. The collage has a clear reading path from navigation to headline to supporting copy.
4. The layout has been checked at desktop, tablet, and mobile widths.
5. The design still works with images disabled or delayed.

## Overall feeling

PCCS should feel:

- Editorial
- Premium
- Calm
- Technical
- Spacious
- Confident
- Precise
- Established, but not old-fashioned

Avoid:

- Generic green corporate styling
- Startup dashboard styling
- Overly colourful fashion layouts
- Too many rounded cards
- Excessive gradients
- Fast, playful animation
- Heavy decorative effects

The intended feeling is quiet engineering confidence.

## Colour balance

Use black, white, and grey as the visual foundation. PCCS green and red should behave like signals, not large background fields.

Target balance:

- White: 60–75%
- Black: 15–25%
- Grey: 5–10%
- Green: 3–5%
- Red: 1–3%, only when something needs attention

Use green for small labels, active navigation states, selected slider indicators, important link arrows, and small graphic details.

Use red for primary CTA emphasis, important status indicators, occasional hover states, and investor or announcement highlights.

## Glass effect

Use glass only for floating elements such as the hero news card, floating CTA panels, image captions, and mobile navigation.

Recommended treatment:

```css
background: rgba(255,255,255,.14);
border: 1px solid rgba(255,255,255,.24);
backdrop-filter: blur(18px) saturate(115%);
-webkit-backdrop-filter: blur(18px) saturate(115%);
box-shadow: 0 18px 55px rgba(0,0,0,.18);
```

Rules:

- Do not apply glass to whole sections.
- Keep text white on dark images.
- Keep the image visible through the panel.
- Avoid strong green or red glass backgrounds.
- Reduce blur and shadow on mobile for performance.
- The effect should feel like a thin technical instrument panel, not a glossy app interface.

## Navigation

Desktop:

- Start transparent over the hero.
- Keep the logo on the left and navigation on the right.
- Separate the primary CTA visually.
- After approximately 70–90px of scroll, transition into a compact glass pill.
- Shrink the logo and reduce horizontal spacing.
- Hide navigation while scrolling down after a long-page threshold.
- Reveal navigation again while scrolling up.

Recommended timings:

- Initial navigation reveal: 700–900ms
- Glass transition: 400–500ms
- Hide/show on scroll: 350–450ms
- Easing: `cubic-bezier(.22,.61,.36,1)`

Mobile:

- Keep the logo and one primary CTA visible.
- Replace the full navigation with a menu button.
- Use a full-width glass drawer or overlay.
- Give menu items at least 44px touch height.
- Do not squeeze all navigation links into one row.

## Hero behavior

The hero should be the strongest motion moment on the page.

Recommended sequence:

1. Load the hero image at approximately 94–96% scale.
2. Expand the image to its full frame over 1.2–1.5 seconds.
3. Move the image slightly upward or sideways.
4. Fade in a dark transparent scrim.
5. Reveal the eyebrow after 500–650ms.
6. Reveal headline lines one at a time.
7. Reveal the floating news or announcement card last.

Recommended timing:

- Image expansion: 1.3s
- Scrim fade: 900ms
- Eyebrow delay: 500ms
- Headline line stagger: 110–140ms
- News card delay: 900–1,100ms

The headline should rise gently by approximately 20–30px and settle. Avoid dramatic flying or bouncing effects.

PCCS hero content:

```text
Engineering Future
The world wears our work.
```

## Typography

Use size and weight to create hierarchy. Do not use green or red to distinguish every level.

Recommended desktop scale:

- Hero headline: 96–152px
- Major section heading: 56–88px
- Secondary heading: 34–56px
- Card heading: 24–40px
- Body copy: 17–21px
- Eyebrow labels: 11–14px

Recommended mobile scale:

- Hero headline: 42–58px
- Major section heading: 34–44px
- Secondary heading: 26–34px
- Card heading: 22–28px
- Body copy: 16–18px
- Eyebrow labels: 10–12px

Use Inter for English and Noto Sans SC for Chinese unless the approved CI direction changes this.

Chinese text should reset negative Latin letter-spacing and receive slightly more line height where needed.

## Page rhythm

Use a repeating rhythm:

```text
Large visual statement
↓
Short editorial explanation
↓
Image or portfolio interaction
↓
Proof/data section
↓
Large visual reset
↓
Next business area
```

Avoid placing many text-heavy sections consecutively.

Recommended section spacing:

- Desktop: 120–180px vertical padding
- Tablet: 88–120px
- Mobile: 64–88px
- Between small content blocks: 24–48px

White space is part of the premium feeling.

## Slider design

Use sliders in two places only:

1. Customer work or apparel imagery
2. Engineering process or group capabilities

Do not turn every section into a carousel.

Desktop slider:

- Show 2.2–3 cards at a time.
- Let the next card partially enter the viewport.
- Use large image areas and minimal text.
- Support drag, arrow buttons, and progress indicators.
- Keep cards aligned to a shared baseline.
- Use a 24–32px gap.

Mobile slider:

- Show one full card plus 12–18% of the next card.
- Enable horizontal swipe.
- Avoid fast automatic advancement.
- Keep card height stable.
- Place progress indicators below the image, not over important copy.

Recommended behavior:

- Auto-advance: 6–8 seconds
- Transition: 700–900ms
- Easing: `cubic-bezier(.22,.61,.36,1)`
- Pause on hover
- Pause while dragging
- Disable autoplay for `prefers-reduced-motion: reduce`
- Use a 3–5px green progress indicator
- Use red only for an active announcement or CTA state

Suggested PCCS engineering slider:

```text
Concept & brief
→ Development
→ Material / fabric
→ The mark
→ Make & quality
→ Finish & deliver
```

## Scroll reveal behavior

Use subtle reveals throughout the page:

- Text moves upward 20–34px.
- Images move upward 12–20px.
- Opacity transitions from 0 to 1.
- Duration: 650–850ms.
- Stagger: 70–120ms between sibling elements.
- Trigger when 12–18% of the element enters the viewport.
- Animate each element once only.

Reveal order for grouped content:

1. Eyebrow
2. Heading
3. Body copy
4. CTA
5. Supporting image or data

Avoid large rotations, bounce effects, fast zooms, and word-by-word animation.

## Image motion

Keep inner-page image movement restrained:

- Scale range: 1.00–1.05
- Vertical shift: 1–3%
- Tie movement to scroll position
- Avoid aggressive horizontal panning
- Avoid constant looping zooms on every image

The hero can have stronger motion. Inner images should feel almost still.

## PCCS content mapping

Use the reference rhythm for this PCCS sequence:

1. Hero — `Engineering Future` / `The world wears our work.`
2. Editorial belief — `Where others see a garment...`
3. One-system module — Engineering Apparel, Engineering Health, Finance, Hotel · F&B
4. Recognition / work — the name behind the names
5. Engineering process — concept, development, fabric, mark, quality, delivery
6. Proof metrics — patents, R&D staff, styles, samples
7. The Group — manifesto, story, leadership, footprint
8. Sustainability — measured commitments and frameworks
9. Investors — approved story and live data module when supplied
10. Careers — `Come engineer what the world wears.`
11. Footer — concise corporate navigation and contact

## Responsive requirements

Desktop, tablet, and mobile must be treated as intentional layouts, not scaled-down desktop layouts.

Desktop:

- Use wide editorial composition.
- Allow large type and overlapping image relationships.
- Use multi-column grids and partial-card sliders.

Tablet:

- Reduce navigation spacing before hiding links.
- Collapse two-column text/image layouts when content becomes cramped.
- Keep headline line lengths readable.

Mobile:

- Remove horizontal overflow entirely.
- Stack cards and data blocks clearly.
- Move floating cards below the hero image when necessary.
- Keep CTA targets at least 44px high.
- Reduce glass blur and parallax movement.
- Preserve the visual rhythm with shorter but still generous spacing.

## Working brief

> Use Wolverine Worldwide as a reference for editorial pacing, image scale, spacious sections, restrained animation, floating glass panels, and premium typography. Keep the PCCS copy sheet as the exact content source. Build the page around large visual statements, short editorial paragraphs, horizontal sliders, proof metrics, and clear section transitions. Use mostly black, white, and grey, with PCCS green and red as small signals. Keep motion slow, controlled, and reduced-motion friendly. The result should feel like an established engineering group, not a fashion campaign or generic corporate website.
