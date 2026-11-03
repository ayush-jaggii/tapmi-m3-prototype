# TAPMI Executive Education — Group 4 Academic Prototype (M3 Website)

> **MANDATORY ACADEMIC DISCLAIMER:**  
> **Student project, not an official TAPMI offering.**  
> Programme designs, fees and services shown here are student proposals for academic evaluation. They are not approved TAPMI offers or an invitation to enrol.

---

## 1. Overview & Context

This repository contains the functional, responsive web implementation for **Group 4's Business Marketing (M3)** project. It operationalises an executive education go-to-market campaign inspired by TAPMI's observed brand identity, built upon the visual and interaction architecture of the **Coding School Website Template by 8B** (MIT License).

### Group 4 Team Roles
- **Ayush:** Website implementation, template fidelity, responsive design, Vercel serverless enquiry API, input validation, and deployment.
- **Benjamin:** CRM integration, Google Sheet database receiver, lead qualification rules, pipeline stages, and automated reminders.
- **Anshita:** Go-to-market strategy, campaign positioning, collateral & resource compilation, deck compilation, and milestone reporting.

---

## 2. Architecture & Tech Stack

- **Frontend:** Multi-page static architecture adhering strictly to the 8B template’s layout, flat color planes, CSS variables, and typography.
  - Zero heavy frontend framework dependencies (instant load, 100% SEO/crawler control, no hydration mismatch).
  - **CSS:** CSS Layers (`@layer tokens, base, atoms, layout, sections, scenes`), custom properties, 24px component radii, 12px input radii, pill CTAs, and hairline dividers.
  - **Typography:** Montserrat (500/600 headings, 400/500 body, 600 labels) with sans-serif system fallbacks.
  - **Motion & Scroll:** GSAP 3.13.0, ScrollTrigger, and Lenis 1.3.27 with full `prefers-reduced-motion` compliance and pure HTML fallback if CDNs are blocked.
- **Backend / Serverless:** `/api/enquiry.js` deployed as a Vercel Serverless Function (Node.js runtime).
  - Handles client/server input validation, rate limiting, and spreadsheet formula-injection protection (`=`, `+`, `-`, `@` escaped).
  - Dual-mode execution: **Standalone Demo Mode** (default when unconfigured) vs **Connected Mode** (when upstream credentials are set).
- **Security & Privacy:**
  - `vercel.json` and `robots.txt` enforce `X-Robots-Tag: noindex, nofollow, noarchive` and `Disallow: /`.
  - Zero third-party trackers, pixels, or paid chatbots.
  - No secrets in git, code, or client bundles (`.env.example` contains variable names only).

---

## 3. Routes & Page Architecture

| Route | File | Scenario ID | Description |
|---|---|---|---|
| `/` | `index.html` | Multiple | Campaign homepage: hero composition, pathways comparison, 5 learning emphases, formats, stakeholder alignment, fee summary, FAQ, enquiry form. |
| `/organisations.html` | `organisations.html` | B2B | Overview for corporate sponsors: comparative breakdown between Sponsored EMBA and Customised MDP. |
| `/emba-b2b.html` | `emba-b2b.html` | `emba_b2b` | **Executive MBA: Sponsored Leadership Pathway**: 5-phase journey, sponsor layer, volume discount tier table, 3-year seat-bank terms, enquiry form. |
| `/mdp-b2b.html` | `mdp-b2b.html` | `mdp_b2b` | **TAPMI Execution Leadership Accelerator**: 6-week cohort format, 8-stage journey, illustrative project, cohort pricing table (20/25/30 seats), enquiry form. |
| `/emba-b2c.html` | `emba-b2c.html` | `emba_b2c` | **Executive MBA: From Functional Expert to Business Leader**: Mid-career professional pathway, founding cohort concession terms, enquiry form. |
| `/resources.html` | `resources.html` | All | Manifest tracking the 9 campaign assets with transparent "Not uploaded yet" states. |
| `/enquire.html` | `enquire.html` | All | Dedicated enquiry route with query parameter scenario preselection (`?scenario=...`) and synthetic evaluator autofill. |
| `/about.html` | `about.html` | N/A | Group 4 background, team ownership, privacy statement, and template licensing credits. |
| `/cert-b2c.html` | `cert-b2c.html` | `cert_b2c` | *Optional extended proposal:* Certificate in AI for Business Applications. |
| `/cert-b2b.html` | `cert-b2b.html` | `cert_b2b` | *Optional extended proposal:* Enterprise Certificate in AI for Business Applications. |
| `404` | `404.html` | N/A | Accessible fallback with disclaimer and return-to-home navigation. |

---

## 4. Fee Schedules & Conditions (Indian Currency)

All prices are student planning estimates in Indian Rupees (INR) before applicable GST:

### A. Sponsored Executive MBA (B2B)
- **Base Fee:** Academic fee Rs 6,50,000 + Sponsor Success Pack Rs 40,000 = **Rs 6,90,000 per seat**.
- **Volume Tiers (Applied to Academic Fee):**
  - **1–2 seats:** 0% discount → **Rs 6,90,000** per seat
  - **3–4 seats:** 5% discount → **Rs 6,57,500** per seat (Rs 6,17,500 + Rs 40,000)
  - **5–9 seats:** 8% discount → **Rs 6,38,000** per seat (Rs 5,98,000 + Rs 40,000)
  - **10+ seats:** 12% cap → **Rs 6,12,000** per seat (Rs 5,72,000 + Rs 40,000)
- **3-Year Seat-Bank:** Annual nominations, escalation capped at 5% after year one, unused seats roll over for one cohort. Founding-cohort concessions do not stack.

### B. Execution Leadership Accelerator (MDP B2B)
- **Base Fee:** Rs 70,000 per participant plus GST, minimum cohort 20.
- **Cohort Commitments:**
  - **20 participants:** **Rs 14,00,000** before GST
  - **25 participants:** **Rs 17,50,000** before GST
  - **30 participants:** **Rs 21,00,000** before GST
- **Repeat Engagement:** 10% discount from second cohort or 40+ participants within 12 months; capped at 15% from third cohort or 60+ participants. (Not automatically granted to initial enquiries).

### C. Individual Executive MBA (B2C)
- **Standard Fee:** Rs 6,50,000 plus applicable GST (term-based instalments).
- **Founding-Cohort Concession:** Rs 5,75,000 before applicable taxes for the inaugural intake only. No intake currently open.

---

## 5. CRM Integration Contract & Handover (For Benjamin)

The website uses an idempotent JSON contract to pass enquiries to Benjamin's receiver.

### Handover Schema
See [`integration-contract.json`](./integration-contract.json) for the full JSON Schema definition. Key payload attributes:
```json
{
  "request_id": "req_m4x123_a1b2c3d4",
  "created_at": "2026-11-02T13:00:00.000Z",
  "scenario_id": "emba_b2b",
  "buyer_type": "B2B_Organisation",
  "name": "Demo Sponsor",
  "email": "demo.sponsor@example.com",
  "phone_optional": "+91 98765 00001",
  "organisation": "Apex Global Technology GCC",
  "job_role": "VP Talent Development",
  "participant_count": "4",
  "capability_need": "Leadership bench transition",
  "timeframe": "3-6 months",
  "budget_band": "Around the proposed fee",
  "consent": true,
  "consent_version": "v1.0-student-prototype",
  "is_test": true,
  "source_page": "/emba-b2b.html"
}
```

### Setup Instructions for Benjamin:
1. Review [`apps-script-receiver.js`](./apps-script-receiver.js).
2. Create or open the target Google Sheet for lead storage.
3. In Extensions → Apps Script, paste the receiver code.
4. Set Script Properties:
   - `ENQUIRY_SECRET`: A shared secret token of your choice.
   - `SHEET_NAME`: Name of the tab (e.g. `Enquiries`).
5. Deploy as Web App (`Execute as: Me`, `Access: Anyone`).
6. Provide the Web App URL to Ayush to configure in Vercel environment variables:
   - `APPS_SCRIPT_URL=<your-web-app-url>`
   - `ENQUIRY_SECRET=<your-shared-secret>`
7. Status is **UNVERIFIED UNTIL BENJAMIN CONFIRMS** end-to-end receipt in the CRM.

---

## 6. Scope Caveat: 3 vs 5 Scenario Coverage Decision

- **Core Selected Scenarios (Active):**
  1. `emba_b2b` (Sponsored Executive MBA)
  2. `mdp_b2b` (Customised MDP Accelerator)
  3. `emba_b2c` (Individual Executive MBA)
- **Extended Scenarios (Prepared behind setting):**
  4. `cert_b2c` (Certificate in AI for Business Applications)
  5. `cert_b2b` (Enterprise Certificate in AI for Business Applications)
- **Configuration Toggle:**
  In `js/config.js`, the flag `EXTENDED_CERTIFICATION_PATHWAYS` is set to `false` by default. Both certification pages are fully built and tested, but excluded from primary navigation unless the team resolves to expand coverage.

---

## 7. Local Development & Automated Verification

### Prerequisites
- Node.js 18+ (tested on Node 20 / macOS)
- Any modern web browser

### Running Tests
Run the comprehensive test suite verifying API validation, formula injection protection, page disclaimers, and fee arithmetic:
```bash
node tests/test-enquiry-api.js
node tests/test-pages.js
```
*(159 static page audits and 13 API test assertions pass with 0 failures).*

### Running Local Development Server
To preview the website locally with API handling:
```bash
node tests/serve.js
```
Navigate to `http://localhost:3333`.

---

## 8. Five-Minute Evaluator Walkthrough

1. **Header & Notice:** Note the top global banner: *"Student project, not an official TAPMI offering."* Verify responsive mobile menu navigation.
2. **Hero Composition (Desktop/Mobile):** Observe the 8B template’s signature color planes, photo placement, Montserrat typography, and text-only pathway ribbon (no fake logos).
3. **Pathways Mapping:** Contrast management need with proposed learning emphasis across EMBA B2B, MDP B2B, and EMBA B2C.
4. **5 Learning Emphases:** Review the horizontal portfolio architecture (Foundations, Leadership, Cross-Functional, Workplace, Review).
5. **Programme Detail Routes:**
   - Navigate to `/emba-b2b.html`: Review the 4-tier volume discount table and 3-year seat bank terms.
   - Navigate to `/mdp-b2b.html`: Review the 6-week 8-stage journey and explicitly labeled illustrative project.
   - Navigate to `/emba-b2c.html`: Review mid-career positioning and founding cohort concession.
6. **Campaign Resources:** Navigate to `/resources.html` to inspect the 9 collateral slots, noting the honest "Not uploaded yet" status.
7. **Enquiry Journey & Demo Mode:**
   - Go to `/enquire.html`. Notice the badge: *"Demo mode: not connected to the CRM"*.
   - Click *"Fill Demo Sponsor (B2B)"* to populate synthetic evaluator data.
   - Submit the form and verify instant feedback: *"Demo recorded in this browser. Nothing was sent to the CRM."*
8. **About & Privacy:** Inspect `/about.html` for team roles, boundary disclosures, and licensing credits.

---

## 9. Deployment to Vercel

### Deploying via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```
The project requires no build command (`buildCommand: null`, static output with `/api/enquiry.js` serverless function).

---

## 10. License & Credits

- Template code: MIT License (© 8B).
- Photography: Free commercial license via Unsplash / Pexels.
- Fonts: SIL Open Font License (Montserrat via Google Fonts).
- Libraries: GSAP & ScrollTrigger (GreenSock Standard License), Lenis (MIT License).
See [`CREDITS.md`](./CREDITS.md) for full asset attribution.
