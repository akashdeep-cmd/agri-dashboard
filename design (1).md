# SwanSAT — Website Design Document

Source: https://swansat.in/ (single-page marketing site)
Documented: July 2026

---

## 1. Overview

SwanSAT is a geospatial intelligence company that turns multi-sensor satellite data (SAR, optical, thermal, weather) into audit-ready intelligence for institutions. The website is a single-page scrolling site aimed at enterprise and government buyers across five sectors: Agriculture, Disaster, Surveillance, Infrastructure, and BFSI.

**Page job:** establish institutional credibility and convert visitors into sales conversations ("Explore Solutions" / "Contact Us").

**Audience:** governments, financial institutions, agribusinesses, critical-infrastructure operators — plus a secondary consumer product (KhetPe) for smallholder farmers.

**Positioning line:** "Where others provide data, we provide intelligence you can act on and defend."

---

## 2. Brand Identity

| Element | Value |
|---|---|
| Brand name | SwanSAT (Swansat Private Limited) |
| Tagline / hero | "Precision Intelligence. Global Impact." |
| Footer strapline | "From space to soil to security." |
| Voice | Institutional, confident, declarative. Short punchy fragments used as headers ("Field Level. Crop Specific. Continuously Monitored."). No exclamation marks, no casual language. |
| Recurring vocabulary | audit-ready, asset-level, field-level, institutional, deployment-grade, multi-sensor, hyperlocal, traceable |

## 3. Color

| Token | Value | Usage |
|---|---|---|
| Primary / Brand Blue | `#0F66CF` | Theme color (from `theme-color` and `msapplication-TileColor` meta tags); likely used for CTAs, links, accents |
| Color scheme | `light dark` | Site declares support for both light and dark modes |

> Note: exact secondary/neutral values are not recoverable from static extraction (the site is JS-rendered). The brand blue `#0F66CF` is the confirmed anchor. A rebuild should pair it with a dark navy/near-black for dark surfaces, white/very light gray for light surfaces, and a single supporting accent — the visual language of the sector (satellite/space + enterprise SaaS) suggests deep blues with high-contrast white type.

## 4. Typography & Type Scale (as used in content hierarchy)

- **H1 (hero):** single statement headline — "Precision Intelligence. Global Impact."
- **Section eyebrows:** ALL-CAPS short labels — SOLUTIONS, TECHNOLOGY, ENTERPRISE READY, PRODUCTS.
- **Section headlines:** sentence-length declaratives — "Built for Complexity. Trusted for Execution."
- **Card titles (H4):** feature names — "Role-Based Access Control".
- **Body:** 1–3 sentence supporting paragraphs; benefit-led, no jargon walls.
- Numbered step markers ("01"–"05") used in the process section — appropriate here because the content is a genuine pipeline sequence.

## 5. Page Structure (top to bottom)

1. **Navigation** — logo + anchors: About, Solutions, Technology, Enterprise Ready, Products, Contact.
2. **Hero** — H1 + subhead ("SwanSAT delivers asset level intelligence to enterprises across agriculture, disaster response, banking, surveillance and infrastructure.") + two CTAs: *Explore Solutions* (primary) and *Contact Us* (secondary). Supporting hero imagery.
3. **About** — one-paragraph positioning statement.
4. **Solutions** — tabbed selector across 5 sectors (Agriculture / Disaster / Surveillance / Infrastructure / BFSI). Each tab shows a dashboard screenshot, a headline, description, and a checklist of capabilities. Agriculture tab capabilities: crop classification (100+ crop types), sowing/harvest date detection, crop stress monitoring, irrigation & water-stress monitoring, yield forecasting, crop damage assessment. Includes an inline KhetPe cross-promo card.
5. **Technology** — two-column comparison table: *Industry Standard* vs *SwanSAT Capability*:
   - Unimodal (single optical sensor) → Multimodal (SAR + optical + thermal fusion)
   - Low resolution, fortnightly revisit → High resolution, daily revisit
   - Cloud-cover blindness → SAR imaging through rain, cloud, low light
   - Regional (district-level) weather → Hyperlocal, field-specific weather updated 4×/day
6. **Our Process ("How We Work")** — 5 numbered steps with icons:
   1. Data Ingestion — continuous multi-sensor capture, works through cloud/monsoon/low light
   2. Harmonization — calibrated, time-aligned, fused into a single geospatial layer
   3. AI Models — trained on Indian conditions, crops, terrain, climate
   4. Intelligence Layer — every output traceable to source data, audit-ready
   5. Dashboards and APIs — configurable dashboards + secure APIs, no client-side infrastructure needed
7. **Enterprise Ready** — 4 feature cards with icons: Role-Based Access Control, Secure Cloud Infrastructure, Enterprise API Integrations, Audit-Ready Intelligence.
8. **Products** — KhetPe mobile app showcase: "Direct-to-farmer intelligence, in every pocket." Feature checklist: Hyperlocal Weather & Moisture Analysis, Crop Growth & Soil Health Tracking, Precision Irrigation Planner, Integrated Insurance Claims. CTA: "Learn More about KhetPe →".
9. **Contact** — "Speak With Our Intelligence Team." Email info@swansat.co.in · Phone 022 4058 7300 · Address: 6, Feltham House, 2nd Floor, 10 J.N. Heredia Marg, Ballard Estate, Mumbai 400001 · CIN U74999MH2022PTC395794.
10. **Footer** — logo, strapline, Company link column, Connect column (LinkedIn, Email), Privacy Policy, Terms of Service, © 2026 SwanSAT.

## 6. Components Inventory

- Sticky/standard nav bar with anchor links and logo
- Primary + secondary CTA button pair (with trailing arrow icons)
- Sector tab switcher (5 tabs) with per-tab content panel
- Checklist rows (check icon + one-line capability)
- Two-column comparison table (them vs us) — the site's signature structural device
- Numbered process steps (01–05) with layered/animated SVG icons
- 4-up icon feature cards
- Product showcase card with app screenshot + checklist + link
- Contact block with icon-labeled rows (email, phone, address, CIN)
- Multi-column footer

## 7. Interaction & Motion

- Site is fully JS-rendered (shows a "This site requires JavaScript" fallback), indicating a modern SPA/animated build.
- Process steps use multiple stacked SVG layers per step — consistent with scroll-triggered or sequenced icon animation.
- Tab switching in the Solutions section is the primary interactive element.
- Recommended rebuild behaviors: scroll-reveal for sections, animated tab transitions, respect `prefers-reduced-motion`.

## 8. Assets

- All assets served from `https://swansat.in/_assets/v11/` — SVG icons (checkmarks, feature icons, nav/arrow glyphs, logo variants for light/dark) and PNG imagery (hero image, dashboard screenshot `f67cf746…png`, KhetPe app image `e6a9265…png`, footer background).
- Social banner: `https://swansat.in/social-banner.jpg`.
- Logo appears in multiple variants (header, footer, mobile).

## 9. SEO / Meta

- Title: "SwanSAT - Geospacial Intelligence" *(note: "Geospacial" is a typo in the live meta title — should be "Geospatial")*
- Description: geospatial intelligence and satellite-powered parametric insurance for agriculture, climate risk, and disaster monitoring
- OG + Twitter cards configured (summary_large_image)
- `robots: noindex` is currently set — the live site is blocking search indexing (likely unintentional for a production site; worth flagging)
- Viewport: responsive, `width=device-width, initial-scale=1`

## 10. Known Content Issues on the Live Site (worth fixing in any rebuild)

1. "Geospacial" typo in meta/OG titles.
2. "LinedIn" typo in the footer (should be "LinkedIn").
3. "Integrated Insurance Claims" is duplicated in the KhetPe feature list.
4. The address link's `href` is malformed (`https://https://022 4058 7300…`).
5. `noindex` robots directive on a public marketing site.
