# PCCS Website Requirements

Status: working requirements for the PCCS Group website.

## Source files

- Correct current Home page: `download code/pccs-proposal1-main/option1/index.html`
- Approved copy source: `Copysheet/Website Copy PCCS Group.pdf`
- Visual direction: `planning/PCCS-visual-direction-brief.md`
- CI reference material is read-only unless approval is given.

The current edited website is local. Changes have not been pushed to GitHub unless explicitly approved and performed.

## Visual and interaction direction

- Editorial, premium, calm, technical, spacious and precise.
- Use Wolverine Worldwide only as a structural and pacing reference; do not copy its wording, code, layout or assets.
- Black, white and grey remain dominant.
- PCCS green and red are signal colours, not large background fields.
- CI red currently uses `#D84236`.
- Red should be used sparingly for purposeful states such as Contact hover, focus states and selected signals. Arrows should remain neutral.
- Use glass/frosted panels carefully, especially for cards and overlays.
- Preserve responsive desktop, tablet and mobile behaviour.
- Respect reduced-motion preferences.

## Home page decisions

Hero hierarchy:

```text
PCCS Group
Engineering Future
The world wears our work.
```

Responsive hero behaviour:

- Wide desktop keeps the headline and news tile side-by-side.
- Tablet gives the headline more width and stacks the tile below it.
- Mobile keeps the headline before the tile.
- The tile is contained and left-aligned on narrow layouts; it must not stretch edge-to-edge or distort its image.
- The mobile menu keeps the persistent header logo and does not show a duplicate centered logo.

Approved Home copy updates:

- Belief section: “Behind the brands people wear is a chain of ideas, details and delivery. From the kit on the pitch to the label inside the collar, we help turn concepts into products people can trust.”
- Chinese equivalent: “人们所穿的品牌背后，是由创意、细节与交付组成的完整链路。从球场上的球衣到领口里的标签，我们帮助客户将概念转化为值得信赖的产品。”
- Investor section uses “manufactures” rather than “makes” and positions PCCS as moving toward a broader product and materials platform.
- Chinese career headline: “来吧，让世界<br>穿上你的作品。”
- Group eyebrow: English “One system — “Engineering Future””; Chinese “一套体系 ——「以工程，创造可能」”.

## CMS direction

The website should have a custom PCCS content dashboard. Not all website content is editable.

Editable content may include:

- English and Chinese page copy
- News and announcements
- Case studies
- Careers and job listings
- Sustainability figures and approved supporting text
- Investor updates approved for publication
- Images, PDFs and alt text
- SEO titles and descriptions
- Contact details where approved

Locked in code:

- Layout and section order
- Typography and spacing
- Colours and visual system
- Animations and transitions
- Navigation structure
- Responsive behaviour
- Buttons and interaction design

The CMS should include:

- Admin login
- Invited users rather than public sign-up
- Editor and approver roles
- Draft, preview and publish states
- English/Chinese fields
- Media uploads
- Validation
- Revision or audit history
- Publish webhook/build trigger

## Backend direction

Initial recommendation: Supabase as the managed backend.

Supabase provides:

- PostgreSQL database
- Authentication
- File storage
- APIs
- Permissions and row-level access control

The custom PCCS dashboard would sit on top of Supabase. Clients would use the PCCS dashboard, not the Supabase admin dashboard.

Do not store large media files directly in database rows. Store images and documents in object storage and keep their references in the database.

## Publishing and international delivery

The public website should not depend on a live database request for every visitor.

Publishing flow:

```text
Client edits content
        ↓
Save draft and preview
        ↓
Approve and publish
        ↓
Build affected page or pages
        ↓
Deploy website output
```

Content is not placed into one giant HTML file. Each page or article is generated separately. A change to one article should rebuild only the affected page and relevant listing/index pages.

For international and mainland China delivery, use one CMS source of truth and, if required, two website deployments:

```text
PCCS CMS
   ↓
Published website build
   ├── International deployment
   └── China-friendly deployment
```

Possible public addresses include `www.pccsgroup.com` and `cn.pccsgroup.com`. The final China hosting provider, access performance and ICP/compliance requirements must be confirmed before launch.

The public China site should not require a live browser connection to an overseas CMS/database. Test CMS dashboard access, authentication emails, image uploads and publishing access from mainland China.

## Next implementation sequence

1. Choose and approve the next page.
2. Define its editable-field list before implementation.
3. Build the page with the current visual system.
4. Create the CMS content model for that page.
5. Connect a prototype dashboard and publishing workflow.
6. Test international and mainland China access before selecting final production hosting.

## Approval gates

Ask before changing:

- Approved copy
- Sitemap
- Investor content or financial data
- Sustainability claims or metrics
- Customer logos
- GitHub
- Deployment or production hosting

## Current static page architecture

The active Option 1 site now has a shared presentation layer and independent page documents:

- download code/pccs-proposal1-main/option1/index.html — Home page.
- download code/pccs-proposal1-main/option1/assets/css/pccs.css — shared design system and responsive section styles.
- download code/pccs-proposal1-main/option1/assets/css/pccs-pages.css — standalone page layout styles.
- download code/pccs-proposal1-main/option1/assets/js/pccs-home.js — Home-only animation, language and menu behavior.
- download code/pccs-proposal1-main/option1/assets/js/pccs-pages.js — shared standalone-page menu behavior.
- download code/pccs-proposal1-main/option1/pages/ — independent page files for Engineering, Our Work, Our Group, Sustainability, Investors and Careers.

Page agents should edit only their assigned file under pages/ plus page-specific assets. Shared CSS and JavaScript changes should be coordinated through the Manager because they affect every page.
