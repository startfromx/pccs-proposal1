# PCCS SEO and AEO Launch Checklist

This checklist records the required search and answer-engine setup for the PCCS website.

## Technical foundation

- [x] Static page titles and meta descriptions
- [x] Canonical URLs
- [x] English and Chinese `hreflang` links
- [x] Open Graph metadata for link previews
- [x] Structured data foundation for PCCS, the website, and breadcrumbs
- [x] Visible FAQ and capability content
- [x] XML sitemap at `/sitemap.xml`
- [x] `robots.txt` at `/robots.txt`
- [x] `/admin/` blocked from crawling
- [x] `llms.txt` at `/llms.txt`
- [x] Public pages use `index, follow`

## Manual launch steps

These steps must be completed by the site owner after deployment:

1. Verify the published site in Google Search Console.
2. Submit the sitemap:

   `https://startfromx.github.io/pccs-proposal1/sitemap.xml`

3. Inspect the home page and main public pages in Google Search Console.
4. Add and verify the site in Bing Webmaster Tools.
5. Submit the same XML sitemap to Bing Webmaster Tools.
6. Check that the GitHub Pages deployment is successful and the public pages are reachable.
7. When a production domain is available, replace the GitHub Pages URL in:
   - `robots.txt`
   - `sitemap.xml`
   - `llms.txt`
   - canonical links
   - `hreflang` links
   - Open Graph URLs
   - structured data
   - the SEO configuration in `assets/js/pccs-home.js`

## Content requirements for AEO

Technical settings alone are not enough. Continue adding visible, source-backed answers to questions such as:

- What does PCCS manufacture?
- Can PCCS develop a product from a sketch or reference garment?
- Which sportswear categories does PCCS support?
- What countries and facilities can support a programme?
- What are the minimum order quantities and lead times?
- Which quality tests and certifications are available?
- How does PCCS protect confidential designs and brand marks?
- What information is needed for a quotation?

The first four questions can be answered from the current approved source material. MOQ, lead time, capacity, certification scope, confidentiality, and quotation-process answers require PCCS confirmation.

## Publishing rules

- Use visible HTML content, not hidden keyword blocks.
- Keep English and Chinese pages aligned in meaning.
- Link claims to official reports or approved company pages when appropriate.
- Remove or update facts that are no longer current.
- Do not publish unconfirmed capacity, certification, customer, financial, or leadership claims.
- Do not promise that Google or an AI system will cite PCCS; the setup improves discoverability and clarity but cannot guarantee rankings or citations.
