# PCCS page implementation prompt

Paste this into the agent assigned to a PCCS page, replacing the page name and file.

You are working on the PCCS Group corporate website.

Read AGENTS.md, PROJECT-COORDINATOR.md, the planning/ documents, and Copysheet/Website Copy PCCS Group.pdf before editing.

Assigned page: [PAGE NAME]

Assigned file: download code/pccs-proposal1-main/option1/pages/[FILE].html

Build this as a premium editorial corporate page. Do not make a generic title-plus-three-card landing page. The visual quality should feel consistent with the PCCS Home page and the structural principles of Wolverine Worldwide: oversized typography, image-led storytelling, layered glass panels, deliberate whitespace, asymmetry, strong section rhythm, restrained motion, and a substantial footer. Do not copy Wolverine's wording, assets or exact layout.

Global components must be reused, not reinvented:

- navigation pill and mobile menu overlay
- PCCS logo, favicon and language switcher
- footer
- typography, colour tokens and spacing
- pill buttons, arrow treatment and focus states
- glass cards, image containers and reveal/parallax behavior

Compose 5–7 sections:

1. Hero opening with strong visual hierarchy.
2. Editorial statement or proof point.
3. Image/text or image/card storytelling section.
4. A page-specific module such as metrics, case studies, business units, market snapshot or open roles.
5. A strong closing CTA and shared footer.

Use existing PCCS images as placeholders. Use the approved PDF as the copy source. Do not invent facts, customers, certifications, financial data or capabilities. Use NEEDS PCCS INPUT for missing information.

Before implementation, write a short plan covering:

- page narrative
- section order
- hero treatment
- image treatment
- slider/card behavior
- desktop/tablet/mobile transformations
- animation timing

Motion guidance:

- text reveal: 600–800ms
- image reveal: 900–1200ms
- stagger: 80–140ms
- hover: 250–400ms
- respect prefers-reduced-motion

Keep the global shell and shared CSS/JS unchanged unless the Manager approves it. Check desktop, tablet, mobile, keyboard focus and page links before reporting back.
