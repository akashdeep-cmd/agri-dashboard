# Product

## Register

product

## Users

Kendra (farmer service center) operators in Maharashtra — staff like "Rajesh Kumar" who register farmers, track soil tests and applications, and match individual farmers (e.g. Ramesh Patil) to government schemes. They work on desktop in an office, often in a hurry, between in-person farmer visits. This build is a stakeholder demo with dummy JSON data, not production.

## Product Purpose

A demo of two dashboard screens for the SwanSAT "Shetkari Seva Kendra" platform: an Operator Dashboard (center stats, quick actions, weekly activity) and a Scheme Matcher (per-farmer eligibility across 22 central + Maharashtra state schemes). Success = the two screens faithfully reproduce the reference screenshots' layout re-themed to the SwanSAT brand, with every number on screen driven by the JSON data layer.

## Brand Personality

Institutional, confident, precise (SwanSAT). Government-services trustworthiness without government-portal clutter. Data reads first; chrome stays quiet.

## Anti-references

- The stock green "agri app" theme from the reference screenshots — replaced by SwanSAT blue #0F66CF.
- Cluttered Indian government portals (dense tables, rainbow badges, marquee notices).
- SaaS gradient-hero dashboard clichés.

## Design Principles

1. **Data is the interface** — every figure (counts, ₹ totals, chart bars) derives from the JSON layer; nothing hardcoded in JSX.
2. **Semantic color is sacred** — brand blue carries identity and action; green/amber/red are reserved for eligibility and priority states.
3. **Screenshot fidelity over invention** — layout decisions follow the reference screens; craft goes into spacing, contrast, and states, not redesign.
4. **Operator speed** — primary actions (register farmer, apply to scheme) are always the most visually prominent element in their region.

## Accessibility & Inclusion

WCAG AA contrast for text (≥4.5:1 body, ≥3:1 large). Chart has an sr-only data table. Status badges pair color with icon + label (never color alone). Desktop-first demo (≥1024px), light mode only.
