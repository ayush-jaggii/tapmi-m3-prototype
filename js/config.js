/**
 * TAPMI Executive Education - Student Project Campaign Configuration
 * Group 4: Business Marketing (B2B & B2C Proposals)
 * 
 * DISCLAIMER:
 * Programme designs, fees and services shown here are student proposals
 * for academic evaluation. They are not approved TAPMI offers or an invitation to enrol.
 */

const CONFIG = {
  // Campaign & Project Metadata
  projectName: "TAPMI Executive Education | Student Project",
  campaignPlatform: "Building India's Management Capability",
  campaignHeadline: "India's Next Chapter Needs Its Next Generation of Leaders.",
  disclaimerGlobal: "Student project, not an official TAPMI offering",
  disclaimerPricing: "Programme designs, fees and services shown here are student proposals for academic evaluation. They are not approved TAPMI offers or an invitation to enrol.",
  illustrativeNotice: "Illustrative project, not a reported client result",
  
  // Scope Configuration: 3 core scenarios selected, 2 certification routes optional
  EXTENDED_CERTIFICATION_PATHWAYS: false,

  // Selected Campaign Programmes & Pricing Details
  programmes: {
    emba_b2b: {
      id: "emba_b2b",
      code: "EMBA-B2B",
      category: "B2B",
      title: "TAPMI Executive MBA: Sponsored Leadership Pathway",
      headline: "Build your next generation of leaders while they keep delivering",
      subline: "Proposed employer-sponsored Executive MBA pathway for high-potential managers.",
      route: "/emba-b2b.html",
      fees: {
        academicPerSeat: 650000,
        sponsorPackPerSeat: 40000,
        baseSingleSeatTotal: 690000,
        currency: "INR",
        taxNote: "All fees are in INR before applicable GST. Payable in term-based instalments.",
        seatBankTerms: "Proposed 3-year seat-bank: agreed annual nominations, annual escalation capped at 5% after year one, unused seats roll over for one cohort.",
        tiers: [
          { seats: "1–2 seats", discount: "0%", academic: 650000, pack: 40000, totalPerSeat: 690000, note: "Standard sponsored rate" },
          { seats: "3–4 seats", discount: "5%", academic: 617500, pack: 40000, totalPerSeat: 657500, note: "5% academic fee concession" },
          { seats: "5–9 seats", discount: "8%", academic: 598000, pack: 40000, totalPerSeat: 638000, note: "8% academic fee concession" },
          { seats: "10+ seats", discount: "12% (cap)", academic: 572000, pack: 40000, totalPerSeat: 612000, note: "Maximum volume concession" }
        ]
      }
    },
    mdp_b2b: {
      id: "mdp_b2b",
      code: "MDP-B2B",
      category: "B2B",
      title: "TAPMI Execution Leadership Accelerator",
      headline: "Turn a management challenge into an execution plan",
      subline: "Proposed customised Management Development Programme for middle managers and emerging business-unit leaders.",
      route: "/mdp-b2b.html",
      fees: {
        perParticipant: 70000,
        minCohort: 20,
        currency: "INR",
        taxNote: "All fees in INR before applicable GST. Minimum cohort commitment: 20 participants.",
        frameworkTerms: "Proposed 2–3 year partnership framework: standard rate year one, annual escalation capped at 5%, agreed scheduling windows, annual co-design refresh.",
        discountRules: "10% per-participant discount from second cohort or 40+ participants within 12 months; capped at 15% from third cohort or 60+ participants.",
        cohortExamples: [
          { participants: 20, feePerPerson: 70000, totalBeforeGst: 1400000 },
          { participants: 25, feePerPerson: 70000, totalBeforeGst: 1750000 },
          { participants: 30, feePerPerson: 70000, totalBeforeGst: 2100000 }
        ]
      }
    },
    emba_b2c: {
      id: "emba_b2c",
      code: "EMBA-B2C",
      category: "B2C",
      title: "TAPMI Executive MBA: From Functional Expert to Business Leader",
      headline: "Lead beyond your function without putting your career on hold",
      subline: "Proposed part-time blended Executive MBA for experienced professionals.",
      route: "/emba-b2c.html",
      fees: {
        standardFee: 650000,
        foundingCohortFee: 575000,
        currency: "INR",
        taxNote: "All fees in INR plus applicable GST, proposed term-based instalments.",
        conditions: "Founding-cohort concession of Rs 5,75,000 applies to the proposed inaugural intake only. No intake currently open. No invented EMI or loan guarantees."
      }
    },
    cert_b2c: {
      id: "cert_b2c",
      code: "CERT-B2C",
      category: "B2C (Optional Extended)",
      title: "TAPMI Certificate in AI for Business Applications",
      headline: "Apply AI to business tasks, with judgement and verification",
      subline: "Proposed 6-week applied certificate for early-career professionals and students.",
      route: "/cert-b2c.html",
      fees: {
        standardFee: 45000,
        studentConcession: 38000,
        currency: "INR",
        taxNote: "Fees plus applicable GST. 6-week format (4–6 hours weekly)."
      }
    },
    cert_b2b: {
      id: "cert_b2b",
      code: "CERT-B2B",
      category: "B2B (Optional Extended)",
      title: "TAPMI Enterprise Certificate in AI for Business Applications",
      headline: "Build assessed AI capability across your team",
      subline: "Proposed 6-week cohort certificate for corporate teams.",
      route: "/cert-b2b.html",
      fees: {
        currency: "INR",
        taxNote: "Per participant plus GST. Dedicated cohorts 30–40 typical.",
        onboardingFee: 150000,
        onboardingWaivedAt: 100,
        tailoringFee: 300000,
        tiers: [
          { cohort: "10–29 participants", feePerParticipant: 45000 },
          { cohort: "30–49 participants", feePerParticipant: 42000 },
          { cohort: "50–99 participants", feePerParticipant: 39900 },
          { cohort: "100+ participants", feePerParticipant: 37800 }
        ]
      }
    }
  },

  // The 9 Campaign Resources Asset Manifest
  resources: [
    {
      id: "res_emba_b2b_av",
      scenario: "Executive MBA (B2B)",
      scenarioId: "emba_b2b",
      title: "Sponsored Executive MBA Pathway Overview Video",
      type: "AV (60–120 sec)",
      format: "MP4 Video",
      description: "Introduction to the proposed sponsored Executive MBA pathway and corporate leadership bench benefits.",
      fileUrl: null,
      status: "Not uploaded yet",
      creativeJustification: "Demonstrates corporate value proposition for HR/L&D buyers in tech & GCCs."
    },
    {
      id: "res_emba_b2b_case",
      scenario: "Executive MBA (B2B)",
      scenarioId: "emba_b2b",
      title: "Enterprise Leadership Development Case Scenario",
      type: "Case Study",
      format: "PDF Document",
      description: "Scenario case-study asset illustrating cross-functional capability development in a technology enterprise.",
      fileUrl: null,
      status: "Not uploaded yet",
      creativeJustification: "Addresses BU head and CXO sponsor alignment questions."
    },
    {
      id: "res_emba_b2b_brochure",
      scenario: "Executive MBA (B2B)",
      scenarioId: "emba_b2b",
      title: "Sponsored Executive MBA Programme & Sponsor Services Guide",
      type: "Brochure",
      format: "PDF Document",
      description: "Detailed curriculum structure, Sponsor Success Pack details, reporting protocols, and tiered volume fee schedules.",
      fileUrl: null,
      status: "Not uploaded yet",
      creativeJustification: "Provides actionable specs for corporate nomination committees."
    },
    {
      id: "res_mdp_b2b_av",
      scenario: "MDP (B2B)",
      scenarioId: "mdp_b2b",
      title: "Execution Leadership Accelerator Video",
      type: "AV (60–120 sec)",
      format: "MP4 Video",
      description: "Overview of the proposed 6-week blended intervention tackling live organizational bottlenecks.",
      fileUrl: null,
      status: "Not uploaded yet",
      creativeJustification: "Engages busy BU heads facing immediate execution friction."
    },
    {
      id: "res_mdp_b2b_case",
      scenario: "MDP (B2B)",
      scenarioId: "mdp_b2b",
      title: "Operational Acceleration Case Scenario",
      type: "Case Study",
      format: "PDF Document",
      description: "Illustrative scenario tracing a team's sales-to-operations handoff diagnosis and revised workflow.",
      fileUrl: null,
      status: "Not uploaded yet",
      creativeJustification: "Clarifies the difference between theoretical training and action learning."
    },
    {
      id: "res_mdp_b2b_brochure",
      scenario: "MDP (B2B)",
      scenarioId: "mdp_b2b",
      title: "Execution Leadership Accelerator Programme Brochure",
      type: "Brochure",
      format: "PDF Document",
      description: "Complete module breakdown, diagnostic phase, 30-day review protocol, and cohort pricing tables.",
      fileUrl: null,
      status: "Not uploaded yet",
      creativeJustification: "Enables L&D leads to present the proposal to internal sponsors."
    },
    {
      id: "res_emba_b2c_av",
      scenario: "Executive MBA (B2C)",
      scenarioId: "emba_b2c",
      title: "Individual Executive MBA Journey Video",
      type: "AV (60–120 sec)",
      format: "MP4 Video",
      description: "Introduction to mid-career transition: moving from functional specialist to confident business generalist.",
      fileUrl: null,
      status: "Not uploaded yet",
      creativeJustification: "Resonates with working professionals seeking strategic career elevation."
    },
    {
      id: "res_emba_b2c_brochure",
      scenario: "Executive MBA (B2C)",
      scenarioId: "emba_b2c",
      title: "Individual Executive MBA Prospectus & Learning Plan",
      type: "Brochure",
      format: "PDF Document",
      description: "Overview of part-time blended delivery, workplace capstone guidelines, and founding-cohort concession terms.",
      fileUrl: null,
      status: "Not uploaded yet",
      creativeJustification: "Essential reference for prospective self-funded candidates."
    },
    {
      id: "res_emba_b2c_poster",
      scenario: "Executive MBA (B2C)",
      scenarioId: "emba_b2c",
      title: "Campaign Creative Poster: 'Lead Beyond Your Function'",
      type: "Poster / Creative",
      format: "Print / Digital Artwork",
      description: "Campaign visual communicating: 'Lead beyond your function without putting your career on hold.'",
      fileUrl: null,
      status: "Not uploaded yet",
      creativeJustification: "Primary visual anchor for individual marketing touchpoints."
    }
  ],

  // Synthetic Test Lead Fixtures for Verification
  fixtures: [
    {
      scenario_id: "emba_b2b",
      buyer_type: "B2B_Sponsor",
      name: "Demo Sponsor",
      email: "demo.sponsor@example.com",
      phone_optional: "+91 98765 00001",
      preferred_contact: "email",
      organisation: "Apex Global Technology GCC",
      job_role: "VP Talent & Leadership Development",
      participant_count: "4",
      capability_need: "Sponsoring senior engineering managers transitioning into cross-functional business unit leaders.",
      timeframe: "3-6 months",
      budget_band: "Around the proposed fee",
      consent: true,
      consent_version: "v1.0-student-prototype",
      is_test: true,
      source_page: "/emba-b2b.html"
    },
    {
      scenario_id: "mdp_b2b",
      buyer_type: "B2B_Organisation",
      name: "Demo L&D Lead",
      email: "demo.ldlead@example.com",
      phone_optional: "+91 98765 00002",
      preferred_contact: "email",
      organisation: "Meridian Logistics & Supply Chain",
      job_role: "Head of Organisational Capability",
      participant_count: "25",
      capability_need: "Addressing sales-to-operations handoff bottlenecks through a 6-week cohort intervention.",
      timeframe: "Within 3 months",
      budget_band: "Around the proposed fee",
      consent: true,
      consent_version: "v1.0-student-prototype",
      is_test: true,
      source_page: "/mdp-b2b.html"
    },
    {
      scenario_id: "emba_b2c",
      buyer_type: "B2C_Individual",
      name: "Demo Professional",
      email: "demo.professional@example.com",
      phone_optional: "+91 98765 00003",
      preferred_contact: "email",
      organisation: "Self / Current Employer",
      job_role: "Senior Product Manager (8 years experience)",
      participant_count: "1",
      capability_need: "Strengthen financial acumen, cross-functional strategic decision making and enterprise leadership.",
      timeframe: "Exploring",
      budget_band: "Around the proposed fee",
      consent: true,
      consent_version: "v1.0-student-prototype",
      is_test: true,
      source_page: "/emba-b2c.html"
    }
  ]
};

// Freeze configuration in browser environments
if (typeof Object.freeze === 'function') {
  Object.freeze(CONFIG);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
