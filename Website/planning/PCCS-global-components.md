# PCCS global components

These elements should be designed once and reused across every page:

## Global shell

- PCCS logo and favicon
- Floating desktop navigation pill
- Mobile Menu + / × control
- Full-screen glass menu overlay
- English / Chinese switcher
- Contact CTA
- Footer navigation, contact details and legal line

Implementation rule: the global navigation and mobile menu are injected by
`option1/assets/js/pccs-home.js`. Pages must not contain their own `.page-nav`,
`.page-menu`, `#siteNav`, or `#mobileMenu` markup. The shared nav enters from
the top, expands into the frame, contracts on scroll, and respects reduced
motion. Keep that behavior centralized; page files should only provide their
page content and load the shared controller.

The footer follows the same rule: `pccs-home.js` injects the Home footer
template on every English/Chinese page. Do not create page-specific footer
templates; page-specific content belongs above the shared footer.

## Global visual language

- Colour tokens: black, white, grey, PCCS green and CI red #D84236
- Typography scale and Chinese type adjustments
- Rounded image containers
- Glass panels and backdrop blur
- Pill buttons and arrow interaction
- Eyebrow labels without obsolete leading rules
- Focus states and reduced-motion behavior
- Shared headline treatment: inner-page hero and feature headlines use the
  Home page's Inter Light/300 treatment with `letter-spacing: -.034em`;
  Chinese pages reset tracking to `normal` for readable CJK typography.

## Reusable content patterns

- Hero frame with image, eyebrow, headline and supporting line
- Hero images use the shared `data-parallax="1.0,0.22,18"` hook so the image
  shifts subtly inside its frame while scrolling; do not make page-specific
  hero images static.
- Editorial statement block
- Image/text split section
- Glass information card
- Horizontal card slider
- Large metric/statistic row
- News or update card
- Scroll reveal and restrained parallax
- Interactive profile tile grid with category tabs and a detail overlay

## Interactive leader/profile module

Use this pattern for PCCS leadership, management, or other people-directory content when a page needs both quick scanning and deeper biographies:

- Start with a short section heading and one-line introduction.
- Separate profile groups with compact tabs, such as `Board of Directors` and `Management`.
- Present each person as a clickable portrait tile with a name label; keep the grid as the stable browsing context.
- On selection, open a focused detail overlay or modal rather than navigating away from the directory.
- The detail view should show the selected portrait, full name, role/title, and approved biography or credentials.
- Keep the selected person visually connected to the tile that opened it, and provide an obvious close control plus Escape-key support.
- Lock background scrolling while the overlay is open; restore focus to the triggering tile when it closes.
- Support keyboard access for tabs, tiles, close controls, and arrow navigation where practical.
- On mobile, use a full-height sheet or near-full-screen panel with a comfortable close target; do not force a desktop-sized modal into a narrow viewport.
- Use approved headshots and approved biographies only. Missing leadership information must remain `NEEDS PCCS INPUT`.
- Keep the interaction calm and editorial: fade/short slide transitions, no bouncing, and no auto-advancing profile cards. Respect `prefers-reduced-motion`.

This is a structural reference inspired by Wolverine Worldwide’s About page. Do not copy its names, biographies, imagery, code, or exact layout.

## Page-specific patterns

These should not be forced onto every page:

- Investor market snapshot
- Sustainability metrics and certification panel
- Careers open-role module
- Group business-unit cards
- Our Work project/case-study slider

Page agents may compose these patterns differently, but they should not create a new visual language for each page.
