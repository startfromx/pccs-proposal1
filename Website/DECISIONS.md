# PCCS Website — Durable Decisions

This file records approved website decisions that must carry across AI sessions. A new session must read this file after `PROJECT-COORDINATOR.md`; chat history alone is not a reliable project memory.

## How to maintain this file

- Add dated decisions only after the user approves them.
- Record the decision, its implementation state, and any reversal path.
- Do not replace approved wording or facts with assumptions from an older PDF or chat.
- Keep unfinished questions clearly marked `OPEN`.

## Approved decisions

### 2026-11-26 — Retire proposal Option 2 and consolidate website images

- Status: approved and implemented in the working copy.
- `Website/download code/pccs-proposal1-main/option1/` is the sole selected website implementation.
- Remove the obsolete `option2/` proposal and remove its links from the two historical proposal selector pages.
- For active website raster assets that have a same-basename WebP replacement, retain the WebP and remove the duplicate JPG/PNG source copy.
- Keep required non-raster assets such as the PCCS SVG logo. CMS uploads may still introduce other formats in future and should be assessed before conversion or removal.

### 2026-11-26 — Retire “Our Work / 合作案例” as a standalone destination

- Status: approved and implemented in the working copy.
- Reason: the page does not present actual case studies, and much of its content overlaps Engineering.
- Remove the destination structurally from global desktop/mobile navigation, footer links, Home/Engineering cards, sitemap, `llms.txt`, and other internal discovery paths. Do not merely hide links with CSS.
- Retain `pages/our-work.html` and `pages/our-work-cn.html` in the repository so the work is recoverable; do not delete them.
- Redirect direct visits to the matching Engineering page:
  - `our-work.html` → `engineering.html`
  - `our-work-cn.html` → `engineering-cn.html`
- Mark the retired URLs `noindex, follow`; canonical and hreflang metadata must point to Engineering.
- Move only user-approved, non-duplicated material to active pages. Do not invent case studies or customer claims.

### 2026-11-26 — Customer logo strip

- Status: approved to display.
- The customer-logo strip remains on the English and Chinese Home pages.
- Do not duplicate it on Engineering unless separately approved.
- Existing customer logos are approved for this implementation; adding new names or logos still requires approval.

### 2026-11-26 — Engineering “Explore More” cards

- Status: approved in the working copy.
- The former Our Work card is removed.
- The three cards are Sustainability, Investor Relations, and Careers.
- The Investor Relations card uses the Investor Relations page hero image.
- English and Chinese card copy should remain aligned in meaning.

### 2026-11-25 — Approved Chinese Engineering/brand wording

- Use: `每一个伟大品牌的印记，背后都有我们的标准。`
- Supporting copy: `我们负责产品的落地生产。无论是整件成衣，还是精细的特殊工艺，我们以严苛标准，全面捍卫品牌的品质声誉。`
- When translating the separate English idea “We’re the name behind the names” elsewhere, preserve the double-name meaning with: `每一个品牌名字背后，都有我们的名字。`

### 2026-11-25 — Careers copy

- Remove `（22 个，分布在四个国家）` from the Chinese open-positions heading.
- Team labels may carry the English sublabels `Development / The Mark / Production`.
- Approved English wording: `through the hands of the people who design, engineer, manufacture, and deliver them.`

### 2026-11-26 — Investor Relations review

- Status: approved and implemented in the working copy from `PCCS 中文站评审-投资者关系 2026-11-12.docx`.
- Remove internal approval notices, compliance workflow text, and all `需要 PCCS 提供` placeholders from the public page.
- Remove the FY2026 financial-performance block until figures can be published with verified sources, reporting basis, dates and approval.
- Avoid language implying that the market undervalues PCCS or presenting an investment “opportunity.”
- Describe fabric activity as collaborative development or a facility in preparation; do not imply unconfirmed ownership.
- Leadership remains one shared CMS-backed grid on Group and Investor pages; do not split it into separate Board and Management grids. Card classification is CMS-controlled as `Board of Directors / 董事会` or `Management / 管理层`, with legacy role-based inference retained as a fallback.
- Board/Management classification is language-independent and synchronizes the matching English and Chinese profile records on save.
- The CMS presents Leadership as one combined bilingual profile list: name, photograph and classification are maintained once; English and Chinese role/biography fields are edited together. Language tabs remain for genuinely language-specific Group story content only.
- Remove document-library file counts. Keep categories and show documents by latest year first.
- Correct the displayed titles for Annual Report 2016, Annual Report 2017 and Statement to Shareholders 2023 without changing the underlying PDF filenames.
- Chinese governance standards include explanatory Chinese annotations. Public contact copy addresses investors, media and analysts without publishing unconfirmed contact details.

## Open items

- Production-domain URLs are not final. Current metadata still uses the temporary GitHub Pages base and must be replaced at launch.
