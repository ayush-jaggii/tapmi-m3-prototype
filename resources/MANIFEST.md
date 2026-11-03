# M3 website resources: what each file is and how to wire it in

Seven finished PDFs, one per download button on resources.html. Replace each button's
generate-a-text-blob logic with a static link to the matching PDF in /public/resources/.

## File to button mapping

1. Leadership-Transition-Executive-Summary-2026.pdf (5 pages)
   -> Flagship card button "Download Executive Summary (PDF)".
2. Sponsored-EMBA-Cohort-Specification.pdf (8 pages)
   -> Card button "Download PDF Specification" (EMBA B2B).
3. MDP-Accelerator-6-Week-Blueprint.pdf (8 pages)
   -> Card button "Download PDF Blueprint" (MDP B2B).
4. Sponsorship-Impact-Measurement-Framework.pdf (6 pages)
   -> Card button "Download PDF Whitepaper" (ROI Telemetry card).
5. Cross-Functional-Transition-Teaching-Case.pdf (5 pages)
   -> Card button "Download PDF Case Study".
6. Individual-Executive-MBA-Prospectus.pdf (7 pages)
   -> Card button "Download PDF Prospectus" (EMBA B2C).
7. PL-Fluency-10-Point-Self-Assessment.pdf (3 pages)
   -> Card button "Download PDF Toolkit".

## Card copy updates needed (so the page matches the files)

- Flagship: remove "surveying 240+ CXOs", "68% of New GMs" and "Research Monograph (36 Pages)".
  The file is an honest executive summary of a conceptual framework, not a survey.
  Suggested label: "Executive Summary, 2026 Edition (5 pages, PDF)".
- Update each card's page count to the actual counts above (18 -> 8, 14 -> 8, 22 -> 6,
  12 -> 5, 20 -> 7, 8 -> 3).
- The hero line "developed by TAPMI faculty and enterprise learning chairs" is not true
  of these files; the documents themselves carry the academic-project footer, so the page
  can keep one honest line instead.
- The "Request Full Benchmark Study" link under the flagship has no full study behind it;
  point it at the project enquiry page or remove it.

## Grounding

Fees, tiers, cohort sizes, programme structures and journey stages inside the PDFs match
the live site pages and the group's own Milestone 2 report exactly. Nothing in the files
invents official TAPMI approval, real clients, surveys or statistics; illustrative figures
are labelled illustrative.
