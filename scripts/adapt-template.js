const fs = require('fs');

let src = fs.readFileSync('coding-school-website-template/index.html', 'utf8');
// Normalize line endings
src = src.replace(/\r\n/g, '\n');

// 1. Meta and Title
src = src.replace(/<title>[\s\S]*?<\/title>/, '<title>TAPMI Executive Education — Group 4 Student Project | Manipal</title>');
src = src.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="TAPMI-inspired executive education website prototype developed by Group 4 for Business Marketing (M3). Featuring Sponsored EMBA, Customised MDP, and Individual EMBA proposals.">');
src = src.replace(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="TAPMI Executive Education — Group 4 Student Project | Manipal">');
src = src.replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="TAPMI-inspired executive education website prototype developed by Group 4 for Business Marketing (M3).">');

// Add robots meta tag
// Clean up top comment and meta tags to remove template references
src = src.replace(/<!--[\s\S]*?-->/, `<!--
  Group 4 Academic Student Project — TAPMI Executive Education Prototype
  Course: Business Marketing (M3) · Academic Evaluation Only
  DISCLAIMER: Student project, not an official TAPMI offering.
-->`);
src = src.replace('<meta name="generator" content="8B Templates">', '<meta name="robots" content="noindex, nofollow, noarchive">');
src = src.replace(/<link rel="icon"[\s\S]*?data-8b-placeholder="favicon">/, `<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2064%2064'%3E%3Crect%20width%3D'64'%20height%3D'64'%20rx%3D'14'%20fill%3D'%23111D30'%2F%3E%3Ctext%20x%3D'32'%20y%3D'44'%20font-family%3D'Arial%2Csans-serif'%20font-size%3D'34'%20font-weight%3D'700'%20text-anchor%3D'middle'%20fill%3D'%23F58232'%3ET%3C%2Ftext%3E%3C%2Fsvg%3E">`);

// 2. Tokens: Replace tokens block
const tokenReplacement = `@layer tokens {
:root {
  --color-1: #f8fafc;
  --color-2: #111d30;
  --color-3: #64748b;
  --color-4: #f58232; /* TAPMI Brand Orange (#F58232 / PANTONE 1575 C) */
  --color-5: #f58232; /* TAPMI Brand Orange */
  --color-6: #f45197; /* TAPMI Pink (#F45197) */
  --color-7: #111d30; /* TAPMI Deep Navy */
  --color-8: #111d30;
  --color-9: #8a90a3;
  --color-10: #e8eef4;
  --color-11: #ffffff;
  --color-12: #e2e8f0;
  --tapmi-orange: #f58232;
  --tapmi-pink: #f45197;
  --font-1: "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-2: "Helvetica Neue", Helvetica, Arial, sans-serif;
  --radius-1: 24px;
  --radius-2: 999px;
  --radius-3: 12px;
  --shadow-1: 0 1px 0 var(--color-12);
  --space-1: clamp(20px, 5vw, 64px);
  --space-2: clamp(96px, 12vw, 168px);
}
}`;
src = src.replace(/@layer tokens\s*\{[\s\S]*?--space-2:[^;]+;\s*\}\s*\}/, tokenReplacement);

// Enforce Helvetica globally & Image Alignment Corrections
const helveticaOverride = `
<style>
  *, *::before, *::after, html, body, button, input, select, textarea, h1, h2, h3, h4, h5, h6, p, a, span, label, div, dt, dd, li {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important;
  }

  /* Image Alignment & Dimensional Precision */
  #hero .plane--photo {
    display: block;
    overflow: hidden;
  }
  #hero .plane--photo img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center center !important;
    display: block !important;
  }

  #course .mod__photo {
    margin: 0;
    min-height: 0;
    height: 100%;
    border-radius: calc(var(--radius-1) * 0.7);
    overflow: hidden;
    display: flex;
  }
  #course .mod__photo img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
    display: block !important;
  }

  #week .slot {
    display: grid !important;
    grid-template-columns: minmax(260px, 1.4fr) 240px minmax(260px, 1.2fr) !important;
    align-items: center !important;
    gap: clamp(24px, 4vw, 48px) !important;
  }
  #week .slot__photo {
    width: 240px !important;
    height: 150px !important;
    margin: 0 auto !important;
    border-radius: var(--radius-2) !important;
    overflow: hidden !important;
    display: block !important;
    flex: none !important;
  }
  #week .slot__photo img {
    width: 100% !important;
    height: 100% !important;
    aspect-ratio: 16 / 10 !important;
    object-fit: cover !important;
    object-position: center !important;
    border-radius: inherit !important;
    display: block !important;
  }
  @media (max-width: 900px) {
    #week .slot {
      grid-template-columns: minmax(0, 1fr) 96px !important;
      gap: 16px 18px !important;
    }
    #week .slot__photo {
      width: 96px !important;
      height: 64px !important;
    }
  }

  #mentors .viewer__shot {
    overflow: hidden;
  }
  #mentors .viewer__shot img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center 25% !important;
    display: block !important;
  }

  #projects .proj__photo {
    margin: 0;
    min-height: 0;
    height: 100%;
    border-radius: calc(var(--radius-1) * 0.7);
    overflow: hidden;
    display: flex;
  }
  #projects .proj__photo img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
    display: block !important;
  }

  .nav__logo img {
    height: 30px !important;
    width: auto !important;
    object-fit: contain !important;
    display: block !important;
  }
  .foot__brand img {
    height: 36px !important;
    width: auto !important;
    object-fit: contain !important;
    display: block !important;
  }
</style>
`;
src = src.replace('</head>', helveticaOverride + '\n</head>');

// 3. Top Banner & Navigation (#nav)
const bannerHtml = `  <!-- Academic Project Disclaimer Banner -->
  <aside class="project-banner" role="note" aria-label="Student project disclaimer" style="background:#111D30;color:#F8FAFC;padding:7px 16px;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;text-align:center;position:relative;z-index:2">
    <span style="display:inline-block;padding:2px 7px;background:#F58232;color:#fff;border-radius:4px;font-weight:700;font-size:10px;letter-spacing:0.04em;text-transform:uppercase">Student Project</span>
    <span><strong>Student project, not an official TAPMI offering.</strong> Prototype for academic evaluation only.</span>
    <a href="about.html" style="color:#fff;text-decoration:underline;text-underline-offset:2px;font-weight:600;font-size:11px;margin-left:4px">About this project</a>
    <button type="button" aria-label="Dismiss disclaimer" style="background:none;border:none;color:#fff;font-size:16px;line-height:1;cursor:pointer;padding:0 6px;opacity:0.8;margin-left:6px" onclick="this.closest('.project-banner').remove();document.querySelector('#hero')?.style.setProperty('padding-top','96px');">&times;</button>
  </aside>`;

// 4. Header & Navigation (#nav)
const navOldRegex = /<header id="nav"[\s\S]*?<\/header>/;
const navNewHtml = `<header id="nav" data-8b-section="navigation">
${bannerHtml}
  <div class="wrap nav__bar">
    <a class="nav__logo" href="#hero" aria-label="TAPMI Executive Education, student project" style="display:flex;align-items:center;gap:12px;text-decoration:none">
      <img src="assets/brand/tapmi-logo.svg" alt="TAPMI Logo" width="130" height="28" style="height:28px;width:auto;display:block">
      
    </a>
    <nav aria-label="Main">
      <ul class="nav__links">
        <li><a class="m-link nav__link" href="#course">Curriculum</a></li>
        <li><a class="m-link nav__link" href="organisations.html">For Organisations</a></li>
        <li><a class="m-link nav__link" href="#fees">Programmes &amp; Fees</a></li>
        <li><a class="m-link nav__link" href="resources.html">Resources</a></li>
        <li><a class="m-link nav__link" href="about.html">About</a></li>
      </ul>
    </nav>
    <a class="m-btn nav__cta" href="#contact"><span class="m-btn__label">Enquire</span></a>
    <button class="nav__menu" type="button" aria-expanded="false" aria-controls="menu">Menu</button>
  </div>
  <div id="menu" class="menu" data-lenis-prevent hidden role="dialog" aria-modal="true" aria-label="Menu">
    <div class="menu__top">
      <img src="assets/brand/tapmi-logo-white.svg" alt="TAPMI Logo" width="120" height="26" style="height:26px;width:auto;display:block">
      <button class="menu__close" type="button">Close</button>
    </div>
    <ul class="menu__links">
      <li><a href="#course">Curriculum</a></li>
      <li><a href="organisations.html">For Organisations</a></li>
      <li><a href="#carry">Pathways</a></li>
      <li><a href="#fees">Programmes &amp; Fees</a></li>
      <li><a href="#projects">Capstones</a></li>
      <li><a href="resources.html">Resources</a></li>
      <li><a href="about.html">About &amp; Privacy</a></li>
      <li><a href="#faq">Questions</a></li>
    </ul>
    <a class="m-btn-2 menu__cta" href="#contact"><span class="m-btn-2__label">Enquire Now</span></a>
  </div>
</header>`;
src = src.replace(navOldRegex, navNewHtml);

// 5. Hero section (#hero)
const heroOldRegex = /<section id="hero"[\s\S]*?<\/section>/;
const heroNewHtml = `<section id="hero" data-8b-section="opening" aria-labelledby="hero-title" data-loop>
    <div class="hero__stage">
      <div class="hero__panel">
        <div class="hero__frame planes">
          <div class="plane plane--ice"><div class="plane__fill"></div></div>
          <div class="plane plane--orange"><div class="plane__fill"></div></div>
          <div class="plane plane--plum"><div class="plane__fill"></div></div>
          <div class="plane plane--deep"><div class="plane__fill"></div></div>
          <figure class="plane plane--photo">
            <img fetchpriority="high" style="background:#111D30;object-fit:cover;object-position:center center;width:100%;height:100%;display:block" src="assets/brand/mahebengaluru-campus.jpg" width="800" height="533" alt="MAHE Bengaluru campus building, home to TAPMI executive education programmes">
          </figure>
          <div class="plane plane--chip"><div class="plane__fill"></div></div>
          <a class="plane hero__tour" href="#course">Explore<br>pathways</a>
          <div class="hero__say">
            <h1 id="hero-title" class="m-text-3">Keep what works. Rewrite the rest.</h1>
            <p class="m-text hero__say-text">You don't start from zero. A decade of team leadership, tested domain expertise, and operational grit: that is proven capability. We help you structure it around modern strategic execution.</p>
            <a class="m-btn-2 hero__cta" href="#contact"><span class="m-btn-2__label">Enquire for your organisation</span></a>
          </div>
          <div class="hero__ship">
            <p class="m-text-4 hero__ship-label">Where our graduates lead</p>
            <ul>
              <li class="ship"><span class="ship__mark" aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#111D30"/><circle cx="17.5" cy="15.5" r="3.2" fill="#86BC25"/></svg></span><span style="font-weight:600">Deloitte<span style="color:#86BC25;margin-left:1px">.</span></span></li>
              <li class="ship"><span class="ship__mark" aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;"><svg width="20" height="20" viewBox="0 0 22 22" fill="none"><rect x="1" y="1" width="9" height="9" fill="#F25022"/><rect x="12" y="1" width="9" height="9" fill="#7FBA00"/><rect x="1" y="12" width="9" height="9" fill="#00A4EF"/><rect x="12" y="12" width="9" height="9" fill="#FFB900"/></svg></span><span style="font-weight:500">Microsoft</span></li>
              <li class="ship ship--light"><span class="ship__mark" aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 19L16 12L5 5" stroke="#A100FF" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span style="font-weight:600;font-family:var(--font-2)">accenture</span></li>
              <li class="ship"><span class="ship__mark" aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;"><svg width="22" height="22" viewBox="0 0 24 24" fill="#FF9900"><path d="M2.5 15.5c5 3.5 12 4 17.5.5.4-.3.8.3.5.7-5.5 4.5-14 3.5-18.5-.5-.3-.3.1-.9.5-.7zm18.5-2.5c-.3-.5-2-.3-2.7 0-.3.1-.2-.2 0-.3 1.5-1 3.2-.7 3.5-.3.4.4.1 2-1 3.2-.2.2-.4.1-.3 0 .6-.7.8-2.2.5-2.6z"/></svg></span><span style="font-weight:600">amazon</span></li>
              <li class="ship ship--light"><span class="ship__mark" aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="#007CC3"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></span><span style="font-weight:600;letter-spacing:-0.02em">Infosys</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>`;
src = src.replace(heroOldRegex, heroNewHtml);

// 6. Careers section (#carry)
const carryOldRegex = /<section id="carry"[\s\S]*?<\/section>/;
const carryNewHtml = `<section id="carry" data-8b-section="careers" aria-labelledby="carry-title">
    <div class="wrap">
      <div class="carry__head">
        <div class="carry__title">
          <span class="m-glyph" aria-hidden="true" data-8b-motion="pixels"><i></i><i></i><i></i><i></i><i></i></span>
          <h2 id="carry-title" class="m-text-3">Your experience isn't dead code.</h2>
        </div>
        <p class="m-text-6 carry__lead">Every leader brings years of tested judgement. Our proposed pathways strengthen those capabilities and direct them toward strategic enterprise growth:</p>
      </div>
      <ol class="diff">
        <li class="diff__row">
          <p class="diff__old m-text-6"><span class="diff__sign" aria-hidden="true"></span><span class="visually-hidden">Current: </span><span class="diff__role">Senior Functional Manager, 10+ years<span class="diff__strike" aria-hidden="true"></span></span></p>
          <p class="diff__new m-text-6"><span class="diff__sign" aria-hidden="true"></span><span class="visually-hidden">Proposed: </span><span class="diff__role">Sponsored Executive MBA · Strategic General Management</span></p>
          <p class="diff__kept m-text-5"><span class="m-text-4">Kept</span> deep operational intuition combined with enterprise-wide P&amp;L clarity.</p>
        </li>
        <li class="diff__row">
          <p class="diff__old m-text-6"><span class="diff__sign" aria-hidden="true"></span><span class="visually-hidden">Current: </span><span class="diff__role">Mid-level Delivery &amp; Operations Leads<span class="diff__strike" aria-hidden="true"></span></span></p>
          <p class="diff__new m-text-6"><span class="diff__sign" aria-hidden="true"></span><span class="visually-hidden">Proposed: </span><span class="diff__role">Customised MDP Accelerator · Cohort Execution</span></p>
          <p class="diff__kept m-text-5"><span class="m-text-4">Kept</span> translating boardroom roadmaps into rapid team accountability.</p>
        </li>
        <li class="diff__row">
          <p class="diff__old m-text-6"><span class="diff__sign" aria-hidden="true"></span><span class="visually-hidden">Current: </span><span class="diff__role">Technical Specialist Moving to Leadership<span class="diff__strike" aria-hidden="true"></span></span></p>
          <p class="diff__new m-text-6"><span class="diff__sign" aria-hidden="true"></span><span class="visually-hidden">Proposed: </span><span class="diff__role">Individual Executive MBA · Flexible Career Elevation</span></p>
          <p class="diff__kept m-text-5"><span class="m-text-4">Kept</span> technical mastery leveraged with strategic executive influence.</p>
        </li>
        <li class="diff__row">
          <p class="diff__old m-text-6"><span class="diff__sign" aria-hidden="true"></span><span class="visually-hidden">Current: </span><span class="diff__role">Business Unit Head Managing Transition<span class="diff__strike" aria-hidden="true"></span></span></p>
          <p class="diff__new m-text-6"><span class="diff__sign" aria-hidden="true"></span><span class="visually-hidden">Proposed: </span><span class="diff__role">Enterprise Innovation &amp; Transformation</span></p>
          <p class="diff__kept m-text-5"><span class="m-text-4">Kept</span> commercial rigor while scaling data-driven business models.</p>
        </li>
        <li class="diff__row">
          <p class="diff__old m-text-6"><span class="diff__sign" aria-hidden="true"></span><span class="visually-hidden">Current: </span><span class="diff__role">Engineering Director on Senior Track<span class="diff__strike" aria-hidden="true"></span></span></p>
          <p class="diff__new m-text-6"><span class="diff__sign" aria-hidden="true"></span><span class="visually-hidden">Proposed: </span><span class="diff__role">Cross-Functional Executive Leadership</span></p>
          <p class="diff__kept m-text-5"><span class="m-text-4">Kept</span> systems thinking applied to organizational strategy and talent.</p>
        </li>
        <li class="diff__row">
          <p class="diff__old m-text-6"><span class="diff__sign" aria-hidden="true"></span><span class="visually-hidden">Current: </span><span class="diff__role">Supply Chain Lead Facing Volatility<span class="diff__strike" aria-hidden="true"></span></span></p>
          <p class="diff__new m-text-6"><span class="diff__sign" aria-hidden="true"></span><span class="visually-hidden">Proposed: </span><span class="diff__role">Strategic Operations &amp; Scaled Governance</span></p>
          <p class="diff__kept m-text-5"><span class="m-text-4">Kept</span> pragmatic cost discipline while expanding market resilience.</p>
        </li>
      </ol>
    </div>
  </section>`;
src = src.replace(carryOldRegex, carryNewHtml);

// 7. Curriculum section (#course)
const courseOldRegex = /<section id="course"[\s\S]*?<\/section>/;
const courseNewHtml = `<section id="course" data-8b-section="curriculum" aria-labelledby="course-title">
    <div class="course__stage">
      <div class="wrap course__head">
        <h2 id="course-title" class="m-text-3">Five strategic modules. Real workplace application.</h2>
        <p class="m-text course__lead">Each module ends with an applied business deliverable that creates measurable value for your organisation. There are no rote exams; you solve real business problems.</p>
      </div>
      <ol class="course__track">
        <li class="mod mod--1">
          <div class="mod__planes" aria-hidden="true"><span class="mod__plane"></span><span class="mod__plane mod__plane--2"></span></div>
          <div class="mod__text">
            <span class="m-badge">Stage 1</span>
            <h3 class="m-text-7">Business Foundations</h3>
            <p class="m-text">Financial decision analysis, economic strategy, and managerial accounting applied directly to enterprise capital allocation.</p>
            <p class="mod__build"><span class="m-text-4">You build</span><span class="m-text">An enterprise capital allocation and financial health model.</span></p>
          </div>
          <figure class="mod__photo"><img style="background:#111D30;object-fit:cover;object-position:center;width:100%;height:100%;display:block" src="https://images.unsplash.com/photo-1770626894265-bdb99db109f1?auto=format&fit=crop&w=590&q=80" width="590" height="393" alt="Indian executive businesswoman analyzing financial metrics on laptop" loading="lazy"></figure>
        </li>
        <li class="mod mod--2">
          <div class="mod__planes" aria-hidden="true"><span class="mod__plane"></span><span class="mod__plane mod__plane--2"></span></div>
          <div class="mod__text">
            <span class="m-badge">Stage 2</span>
            <h3 class="m-text-7">People &amp; Leadership</h3>
            <p class="m-text">Organizational culture, executive negotiation, and leading high-performance cross-functional teams through complex change.</p>
            <p class="mod__build"><span class="m-text-4">You build</span><span class="m-text">A team transformation blueprint and change governance framework.</span></p>
          </div>
          <figure class="mod__photo"><img style="background:#111D30;object-fit:cover;object-position:center;width:100%;height:100%;display:block" src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=590&q=80" width="590" height="393" alt="Indian executive team in strategic leadership discussion" loading="lazy"></figure>
        </li>
        <li class="mod mod--3">
          <div class="mod__planes" aria-hidden="true"><span class="mod__plane"></span><span class="mod__plane mod__plane--2"></span></div>
          <div class="mod__text">
            <span class="m-badge">Stage 3</span>
            <h3 class="m-text-7">Cross-Functional Decisions</h3>
            <p class="m-text">Marketing strategy, supply chain synchronization, and technology-driven operating models aligned with market demand.</p>
            <p class="mod__build"><span class="m-text-4">You build</span><span class="m-text">A cross-department strategic alignment &amp; product-market canvas.</span></p>
          </div>
          <figure class="mod__photo"><img style="background:#111D30;object-fit:cover;object-position:center;width:100%;height:100%;display:block" src="https://images.unsplash.com/photo-1776248783518-400b6d0da64c?auto=format&fit=crop&w=590&q=80" width="590" height="393" alt="Indian cross-functional corporate team in modern conference room" loading="lazy"></figure>
        </li>
        <li class="mod mod--4">
          <div class="mod__planes" aria-hidden="true"><span class="mod__plane"></span><span class="mod__plane mod__plane--2"></span></div>
          <div class="mod__text">
            <span class="m-badge">Stage 4</span>
            <h3 class="m-text-7">Workplace Application</h3>
            <p class="m-text">Data-backed experimentation, executive communication, and operational pilot design tested against live commercial conditions.</p>
            <p class="mod__build"><span class="m-text-4">You build</span><span class="m-text">A workplace pilot project with live operational telemetry.</span></p>
          </div>
          <figure class="mod__photo"><img style="background:#111D30;object-fit:cover;object-position:center;width:100%;height:100%;display:block" src="https://images.unsplash.com/photo-1762341116897-921e2a52f7ff?auto=format&fit=crop&w=590&q=80" width="590" height="393" alt="Indian corporate professional testing operational pilot telemetry on laptop" loading="lazy"></figure>
        </li>
        <li class="mod mod--5">
          <div class="mod__planes" aria-hidden="true"><span class="mod__plane"></span><span class="mod__plane mod__plane--2"></span></div>
          <div class="mod__text">
            <span class="m-badge">Stage 5</span>
            <h3 class="m-text-7">Review &amp; Reflection</h3>
            <p class="m-text">Executive capstone defense, board-level strategic synthesis, and measurable post-programme sponsor reporting.</p>
            <p class="mod__build"><span class="m-text-4">You build</span><span class="m-text">A sponsor impact report &amp; 3-year enterprise scale strategy.</span></p>
          </div>
          <figure class="mod__photo"><img style="background:#111D30;object-fit:cover;object-position:center;width:100%;height:100%;display:block" src="https://images.unsplash.com/photo-1775113586139-b583cc93517f?auto=format&fit=crop&w=590&q=80" width="590" height="393" alt="Indian executive leader presenting capstone defense at corporate symposium" loading="lazy"></figure>
        </li>
      </ol>
      <div class="wrap course__weeks">
        <ol class="weeks" aria-hidden="true"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ol>
        <p class="m-text-4 weeks__ends"><span>Stage 1: Orientation</span><span>Stage 5: Sponsor Defense</span></p>
      </div>
    </div>
  </section>`;
src = src.replace(courseOldRegex, courseNewHtml);

// 8. Schedule section (#week)
const weekOldRegex = /<section id="week"[\s\S]*?<\/section>/;
const weekNewHtml = `<section id="week" data-8b-section="schedule" aria-labelledby="week-title">
    <div class="wrap">
      <div class="week__head">
        <h2 id="week-title" class="m-text-3" data-8b-motion="rise">Built around the job you still have.</h2>
        <p class="m-text-6" data-8b-motion="rise">Structured around intense executive responsibilities: synchronous weekend masterclasses, asynchronous weekday prep, and immediate workplace application.</p>
      </div>
      <ol class="slots">
        <li class="slot">
          <h3 class="m-text-7 slot__day">Alternate Weekends</h3>
          <figure class="slot__photo" data-8b-motion="settle"><img style="background:#111D30;object-fit:cover;object-position:center;width:100%;height:100%;display:block" src="https://images.unsplash.com/photo-1722573783625-eceb04251036?auto=format&fit=crop&w=480&q=80" width="240" height="150" alt="Indian executive cohort in live case discussion" loading="lazy"></figure>
          <div class="slot__what">
            <p class="m-text-4">Sat &amp; Sun · Live Executive Immersion</p>
            <p class="m-text-5">Faculty-led case discussions, boardroom simulations, and peer roundtables. Fully recorded for business travel flexibility.</p>
          </div>
        </li>
        <li class="slot">
          <h3 class="m-text-7 slot__day">Weekday Synthesis</h3>
          <figure class="slot__photo" data-8b-motion="settle"><img style="background:#111D30;object-fit:cover;object-position:center;width:100%;height:100%;display:block" src="https://images.unsplash.com/photo-1770626899426-baed57609a30?auto=format&fit=crop&w=480&q=80" width="240" height="150" alt="Indian professional reviewing digital case prep on laptop" loading="lazy"></figure>
          <div class="slot__what">
            <p class="m-text-4">Flexible · Digital Asynchronous Prep</p>
            <p class="m-text-5">Bite-sized prep materials, asynchronous case videos, and collaborative discussion boards to review between business meetings.</p>
          </div>
        </li>
        <li class="slot">
          <h3 class="m-text-7 slot__day">Workplace Labs</h3>
          <figure class="slot__photo" data-8b-motion="settle"><img style="background:#111D30;object-fit:cover;object-position:center;width:100%;height:100%;display:block" src="https://images.unsplash.com/photo-1771244678811-50c22f17c791?auto=format&fit=crop&w=480&q=80" width="240" height="150" alt="Indian business manager applying frameworks at office desk" loading="lazy"></figure>
          <div class="slot__what">
            <p class="m-text-4">Continuous · Applied Enterprise Projects</p>
            <p class="m-text-5">Apply each framework directly to real corporate challenges with immediate feedback from academic advisors and executive mentors.</p>
          </div>
        </li>
      </ol>
    </div>
  </section>`;
src = src.replace(weekOldRegex, weekNewHtml);

// 9. Mentors section (#mentors)
const mentorsOldRegex = /<section id="mentors"[\s\S]*?<\/section>/;
const mentorsNewHtml = `<section id="mentors" data-8b-section="mentors" aria-labelledby="mentors-title">
    <div class="wrap">
      <div class="mentors__head">
        <h2 id="mentors-title" class="m-text-3">Designed around the learner and sponsor.</h2>
        <p class="m-text-6">Three distinct stakeholder perspectives ensure that every rupee invested yields measurable organizational and personal returns.</p>
      </div>
      <div class="mentors__grid">
        <div class="viewer">
          <figure class="viewer__shot"><img style="background:#111D30;object-fit:cover;object-position:center 20%;width:100%;height:100%;display:block" src="https://images.unsplash.com/photo-1778692258270-bc0e80e975c0?auto=format&fit=crop&w=1000&q=85" width="560" height="700" alt="Indian corporate sponsor executive portrait (illustrative)" loading="lazy"></figure>
          <figure class="viewer__shot"><img style="background:#111D30;object-fit:cover;object-position:center 20%;width:100%;height:100%;display:block" src="https://images.unsplash.com/photo-1762341124796-530c0085f7d8?auto=format&fit=crop&w=1000&q=85" width="560" height="700" alt="Indian executive participant businesswoman portrait (illustrative)" loading="lazy"></figure>
          <figure class="viewer__shot"><img style="background:#111D30;object-fit:cover;object-position:center 20%;width:100%;height:100%;display:block" src="https://images.unsplash.com/photo-1742981365880-698cfb84492d?auto=format&fit=crop&w=1000&q=85" width="560" height="700" alt="Indian enterprise talent director portrait (illustrative)" loading="lazy"></figure>
          <figure class="viewer__shot"><img style="background:#111D30;object-fit:cover;object-position:center 20%;width:100%;height:100%;display:block" src="https://images.unsplash.com/photo-1758685734463-98672a67dd1c?auto=format&fit=crop&w=1000&q=85" width="560" height="700" alt="Indian academic director professor portrait (illustrative)" loading="lazy"></figure>
        </div>
        <div class="mentors__list">
          <article class="mentor">
            <h3 class="m-text-7">The Corporate Sponsor</h3>
            <dl class="mentor__path">
              <div><dt class="m-text-4">Need</dt><dd class="m-text">Retain high-potentials &amp; close strategic capability gaps</dd></div>
              <div><dt class="m-text-4">Value</dt><dd class="m-text">Quarterly milestone reporting, 3-year seat bank &amp; ROI telemetry</dd></div>
            </dl>
            <p class="m-text-5">Sponsors require accountability. Every participant's capstone addresses a verified operational bottleneck, ensuring that leadership development directly funds enterprise innovation.</p>
            <span class="m-badge">Focus: Enterprise ROI</span>
          </article>
          <article class="mentor">
            <h3 class="m-text-7">The Executive Participant</h3>
            <dl class="mentor__path">
              <div><dt class="m-text-4">Need</dt><dd class="m-text">Transition from specialized execution to general management</dd></div>
              <div><dt class="m-text-4">Value</dt><dd class="m-text">P&amp;L fluency, executive presence &amp; peer network</dd></div>
            </dl>
            <p class="m-text-5">Balancing intense workload with senior executive ambition. The weekend schedule and direct workplace integration mean that Monday morning immediately reflects classroom insights.</p>
            <span class="m-badge">Focus: Career Elevation</span>
          </article>
          <article class="mentor">
            <h3 class="m-text-7">The Enterprise L&amp;D Head</h3>
            <dl class="mentor__path">
              <div><dt class="m-text-4">Need</dt><dd class="m-text">Cohort capability building without generic training fatigue</dd></div>
              <div><dt class="m-text-4">Value</dt><dd class="m-text">Tailored 6-week MDP modules aligned with corporate transformation</dd></div>
            </dl>
            <p class="m-text-5">Customized cohorts of 20 to 30 managers learn shared frameworks, accelerating strategic change across cross-functional business units simultaneously.</p>
            <span class="m-badge">Focus: Targeted Upskilling</span>
          </article>
          <article class="mentor">
            <h3 class="m-text-7">The Academic Director</h3>
            <dl class="mentor__path">
              <div><dt class="m-text-4">Need</dt><dd class="m-text">Maintain academic rigor while solving live business problems</dd></div>
              <div><dt class="m-text-4">Value</dt><dd class="m-text">Case method pedagogy, continuous feedback &amp; industry defense</dd></div>
            </dl>
            <p class="m-text-5">Combining management theory with Indian and global market realities. Rigorous peer review and faculty advisory ensure capstones withstand board-level scrutiny.</p>
            <span class="m-badge">Focus: Academic Rigor</span>
          </article>
        </div>
      </div>
    </div>
  </section>`;
src = src.replace(mentorsOldRegex, mentorsNewHtml);

// 10. Capstones section (#projects)
const projOldRegex = /<section id="projects"[\s\S]*?<\/section>/;
const projNewHtml = `<section id="projects" data-8b-section="capstones" aria-labelledby="projects-title">
    <div class="wrap">
      <div class="projects__head">
        <h2 id="projects-title" class="m-text-3">Capstones that deliver enterprise impact.</h2>
        <p class="m-text-6">In the final stage, participants undertake applied organizational transformation projects for their sponsor companies. Three representative models:</p>
      </div>
      <div class="proj-stack">
        <article class="proj proj--1">
          <figure class="proj__photo"><img style="background:#111D30;object-fit:cover;object-position:center;width:100%;height:100%;display:block" src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=910&q=80" width="910" height="606" alt="Warehouse logistics and supply chain management" loading="lazy"></figure>
          <div class="proj__text">
            <p class="m-text-4">Manufacturing &amp; Logistics · Proposed Model</p>
            <h3 class="m-text-7">Supply chain predictive resilience framework</h3>
            <p class="m-text">Optimizing multi-tier vendor visibility and safety stock algorithms to reduce inventory holding costs by 14% while mitigating single-source disruption risk.</p>
            <p class="m-text-4 proj__still">Simulated Enterprise Model</p>
          </div>
        </article>
        <article class="proj proj--2">
          <figure class="proj__photo"><img style="background:#111D30;object-fit:cover;object-position:center;width:100%;height:100%;display:block" src="https://images.unsplash.com/photo-1565373679107-344d38dbf734?auto=format&fit=crop&w=910&q=80" width="910" height="606" alt="Indian Rupee financial analytics and risk scoring dashboard" loading="lazy"></figure>
          <div class="proj__text">
            <p class="m-text-4">Financial Services &amp; FinTech · Proposed Model</p>
            <h3 class="m-text-7">Digital customer acquisition &amp; risk score engine</h3>
            <p class="m-text">Automating credit eligibility scoring for SME loan portfolios while maintaining strict regulatory compliance and reducing loan approval cycle times.</p>
            <p class="m-text-4 proj__still">Simulated Enterprise Model</p>
          </div>
        </article>
        <article class="proj proj--3">
          <figure class="proj__photo"><img style="background:#111D30;object-fit:cover;object-position:center;width:100%;height:100%;display:block" src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=910&q=80" width="910" height="606" alt="Enterprise cloud operations and software engineering telemetry dashboard" loading="lazy"></figure>
          <div class="proj__text">
            <p class="m-text-4">Enterprise Technology &amp; GCCs · Proposed Model</p>
            <h3 class="m-text-7">Global delivery automation and platform reliability</h3>
            <p class="m-text">Architecting automated incident-triage and multi-region service resilience frameworks, reducing critical system MTTR while cutting recurring operational overhead.</p>
            <p class="m-text-4 proj__still">Simulated Enterprise Model</p>
          </div>
        </article>
      </div>
    </div>
  </section>`;
src = src.replace(projOldRegex, projNewHtml);

// 11. Stories section (#stories)
const storiesOldRegex = /<section id="stories"[\s\S]*?<\/section>/;
const storiesNewHtml = `<section id="stories" data-8b-section="graduates" aria-labelledby="stories-title">
    <div class="wrap">
      <div class="stories__head">
        <span class="m-glyph-2" aria-hidden="true" data-8b-motion="pixels"><i></i><i></i><i></i><i></i><i></i></span>
        <h2 id="stories-title" class="m-text-3" data-8b-motion="rise">Perspectives in strategic leadership.</h2>
      </div>
      <figure class="story story--lead" data-8b-motion="rise">
        <blockquote class="m-text-6"><p>The true ROI of executive education isn't an academic title — it's the confidence to enter any boardroom, interrogate the P&amp;L, and lead organizational change with clarity.</p></blockquote>
        <figcaption><span class="m-text-7 story__name">Programme Philosophy</span><span class="m-text-4">TAPMI-Inspired Executive Learning Framework · Group 4 Student Proposal</span></figcaption>
      </figure>
      <ul class="story-log">
        <li class="story" data-8b-motion="rise">
          <blockquote class="m-text"><p>Balancing weekend study with a director's workload was demanding, but the direct relevance to our quarterly business review made every hour count.</p></blockquote>
          <p class="story__by"><span class="m-text-7 story__name">Executive Participant</span><span class="m-text-4">Sponsored EMBA Proposal Perspective</span></p>
        </li>
        <li class="story" data-8b-motion="rise">
          <blockquote class="m-text"><p>The customised MDP brought 25 of our plant leads onto the exact same strategic page within six weeks. The shared vocabulary alone accelerated our rollout.</p></blockquote>
          <p class="story__by"><span class="m-text-7 story__name">VP of Operations</span><span class="m-text-4">Enterprise Sponsor Perspective</span></p>
        </li>
        <li class="story" data-8b-motion="rise">
          <blockquote class="m-text"><p>The 3-year seat bank eliminated our budget anxiety. We could allocate seats to our highest-performing managers as they earned their promotions.</p></blockquote>
          <p class="story__by"><span class="m-text-7 story__name">Head of Talent Management</span><span class="m-text-4">Corporate HR Partner Perspective</span></p>
        </li>
        <li class="story" data-8b-motion="rise">
          <blockquote class="m-text"><p>I learned how to defend strategic capital requests with financial rigor rather than just technical optimism. That unlocked my promotion to the executive team.</p></blockquote>
          <p class="story__by"><span class="m-text-7 story__name">Engineering Director</span><span class="m-text-4">Individual EMBA Proposal Perspective</span></p>
        </li>
      </ul>
    </div>
  </section>`;
src = src.replace(storiesOldRegex, storiesNewHtml);

// 12. Taster section (#taster)
const tasterOldRegex = /<section id="taster"[\s\S]*?<\/section>/;
const tasterNewHtml = `<section id="taster" data-8b-section="taster" aria-labelledby="taster-title">
    <div class="wrap">
      <div class="taster__head">
        <h2 id="taster-title" class="m-text-3">Evaluate alignment for your organisation.</h2>
        <p class="m-text-6">Executive briefings and curriculum review sessions are complimentary and conducted by programme advisors. We review cohort needs and sponsor objectives.</p>
      </div>
      <div class="taster__stage">
        <div class="taster__panel">
          <svg class="taster__mark" viewBox="0 0 40 16" aria-hidden="true"><path d="M0 8h37M30 1l7 7-7 7"/></svg>
          <div class="taster__content">
            <h3 class="m-text-7">Executive Advisory Briefings</h3>
            <ul class="dates">
              <li class="date">
                <p class="m-text-7 date__day">Sponsored EMBA Briefing</p>
                <p class="m-text">45 min online executive consultation · Review 3-year seat bank terms</p>
                <a class="m-btn-2" href="#contact" aria-label="Book Sponsored EMBA consultation"><span class="m-btn-2__label">Enquire</span></a>
              </li>
              <li class="date">
                <p class="m-text-7 date__day">Customised MDP Diagnostic</p>
                <p class="m-text">Corporate talent diagnostic · 20–30 participant cohort planning</p>
                <a class="m-btn-2" href="#contact" aria-label="Book Customised MDP diagnostic"><span class="m-btn-2__label">Enquire</span></a>
              </li>
              <li class="date">
                <p class="m-text-7 date__day">Individual Candidate Review</p>
                <p class="m-text">Career trajectory review · Founding cohort concession evaluation</p>
                <a class="m-btn-2" href="#contact" aria-label="Book Candidate Review"><span class="m-btn-2__label">Enquire</span></a>
              </li>
              <li class="date">
                <p class="m-text-7 date__day">Sponsor Evaluation Kit</p>
                <p class="m-text">Download complete curriculum, pricing tiers, and ROI framework</p>
                <a class="m-btn-2" href="resources.html" aria-label="View Resources"><span class="m-btn-2__label">View Kit</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>`;
src = src.replace(tasterOldRegex, tasterNewHtml);

// 13. Fees section (#fees)
const feesOldRegex = /<section id="fees"[\s\S]*?<\/section>/;
const feesNewHtml = `<section id="fees" data-8b-section="pricing" aria-labelledby="fees-title">
    <div class="wrap">
      <div class="fees__head">
        <h2 id="fees-title" class="m-text-3">Transparent programme investment.</h2>
        <p class="m-text-6">Structured for corporate sponsors and ambitious individuals. All fees displayed in Indian Rupees before applicable GST. Academic evaluation proposals.</p>
      </div>
      <div class="plans">
        <article class="m-surface plan plan--1">
          <div class="plan__top">
            <h3 class="m-text-7">Sponsored EMBA</h3>
            <p class="plan__price"><span class="m-text-7">₹6,90,000</span><span class="m-text-4">per seat base</span></p>
          </div>
          <div class="plan__body">
            <p class="m-text-5">₹6,50,000 academic fee + ₹40,000 corporate sponsor pack. Volume discounts: 3–4 seats (5% off academic fee: ₹6,57,500), 5–9 seats (8%: ₹6,38,000), 10+ seats (12% cap: ₹6,12,000). 3-year seat bank available.</p>
            <a class="m-btn" href="#contact"><span class="m-btn__label">Enquire B2B EMBA</span></a>
          </div>
        </article>
        <article class="m-surface plan plan--2">
          <div class="plan__top">
            <h3 class="m-text-7">Customised MDP</h3>
            <p class="plan__price"><span class="m-text-7">₹70,000</span><span class="m-text-4">per participant</span></p>
          </div>
          <div class="plan__body">
            <p class="m-text-5">Intensive 6-week accelerator for cohorts of 20–30 leaders. 20 seats = ₹14,00,000; 25 seats = ₹17,50,000; 30 seats = ₹21,00,000. Repeat cohort discounts: 10% from 2nd cohort; 15% cap from 3rd cohort.</p>
            <a class="m-btn" href="#contact"><span class="m-btn__label">Enquire B2B MDP</span></a>
          </div>
        </article>
        <article class="m-surface plan plan--3">
          <div class="plan__top">
            <h3 class="m-text-7">Individual EMBA</h3>
            <p class="plan__price"><span class="m-text-7">₹6,50,000</span><span class="m-text-4">or ₹5,75,000 founding</span></p>
          </div>
          <div class="plan__body">
            <p class="m-text-5">Comprehensive 18-month executive format for self-sponsored leaders. Founding-cohort concession: ₹5,75,000. Flexible installment plans available for working professionals.</p>
            <a class="m-btn" href="#contact"><span class="m-btn__label">Enquire B2C EMBA</span></a>
          </div>
        </article>
      </div>
    </div>
  </section>`;
src = src.replace(feesOldRegex, feesNewHtml);

// 14. FAQ section (#faq)
const faqOldRegex = /<section id="faq"[\s\S]*?<\/section>/;
const faqNewHtml = `<section id="faq" data-8b-section="faq" aria-labelledby="faq-title">
    <div class="wrap faq__grid">
      <div class="faq__head">
        <span class="m-glyph" aria-hidden="true" data-8b-motion="pixels"><i></i><i></i><i></i><i></i><i></i></span>
        <h2 id="faq-title" class="m-text-3" data-8b-motion="rise">Frequently asked questions.</h2>
        <p class="m-text">Have questions about our academic proposal? Contact Group 4 via the enquiry form below or explore our <a class="m-link" href="about.html">project documentation</a>.</p>
      </div>
      <div class="faq__list">
        <details class="qa">
          <summary><span class="m-text-7">Is this an official TAPMI enrollment portal?</span><span class="qa__icon" aria-hidden="true"></span></summary>
          <p class="m-text">No. This website is an academic prototype developed by Group 4 students for the Business Marketing (M3) course. All programme structures, fees, and services shown are student proposals for academic grading and do not constitute approved university offerings or an invitation to enrol.</p>
        </details>
        <details class="qa">
          <summary><span class="m-text-7">How does the 3-year corporate seat bank operate?</span><span class="qa__icon" aria-hidden="true"></span></summary>
          <p class="m-text">Under the Sponsored EMBA proposal, organisations purchasing 3 or more seats lock in their volume discount tier and may deploy participants flexibly across rolling cohort intakes over a 36-month window without losing seat equity.</p>
        </details>
        <details class="qa">
          <summary><span class="m-text-7">What volume discounts apply to corporate cohorts?</span><span class="qa__icon" aria-hidden="true"></span></summary>
          <p class="m-text">For the Sponsored EMBA, the ₹6,50,000 academic fee receives a 5% discount for 3–4 seats (₹6,57,500 total with ₹40,000 sponsor pack), 8% for 5–9 seats (₹6,38,000 total), and 12% cap for 10+ seats (₹6,12,000 total). For the Customised MDP, repeat cohorts receive a 10% discount from the 2nd cohort (or 40+ cumulative seats) and a 15% cap from the 3rd cohort.</p>
        </details>
        <details class="qa">
          <summary><span class="m-text-7">Can curriculum modules be tailored for enterprise cohorts?</span><span class="qa__icon" aria-hidden="true"></span></summary>
          <p class="m-text">Yes. The Customised Management Development Programme (MDP) Accelerator is designed specifically for enterprise co-creation, enabling organisations to select 3 core modules and 2 industry-specific application tracks aligned directly with corporate strategic priorities.</p>
        </details>
        <details class="qa">
          <summary><span class="m-text-7">What is the expected time commitment for working executives?</span><span class="qa__icon" aria-hidden="true"></span></summary>
          <p class="m-text">The EMBA schedule requires alternate weekend attendance (Saturday and Sunday) alongside approximately 6 hours of weekday self-directed preparation and applied workplace lab execution, structured specifically so full-time leaders do not compromise professional obligations.</p>
        </details>
        <details class="qa">
          <summary><span class="m-text-7">Where does enquiry data go?</span><span class="qa__icon" aria-hidden="true"></span></summary>
          <p class="m-text">This prototype runs in Demo Mode by default. When you submit an enquiry, data is validated by our Vercel Serverless API (/api/enquiry), protected against formula injection, and returned with a simulated request ID in the browser. In live mode, it connects to teammate Benjamin's Google Sheets CRM receiver.</p>
        </details>
      </div>
    </div>
  </section>`;
src = src.replace(faqOldRegex, faqNewHtml);

// 15. Contact section (#contact)
const contactOldRegex = /<section id="contact"[\s\S]*?<\/section>/;
const contactNewHtml = `<section id="contact" data-8b-section="contact" aria-labelledby="contact-title">
    <div class="contact__planes planes" aria-hidden="true">
      <div class="plane plane--orange"><div class="plane__fill"></div></div>
      <div class="plane plane--plum"><div class="plane__fill"></div></div>
      <div class="plane plane--ice"><div class="plane__fill"></div></div>
    </div>
    <div class="wrap contact__grid">
      <div class="contact__info">
        <h2 id="contact-title" class="m-text-3">Enquire for your organisation, or just ask.</h2>
        <p class="m-text-6">Submit an enquiry to explore leadership development pathways, corporate cohort customisations, or schedule an executive advisory consultation with our admissions team.</p>
        <dl class="contact__details">
          <div><dt class="m-text-4">Campus</dt><dd class="m-text">T. A. Pai Management Institute (TAPMI), MAHE Bengaluru &amp; Manipal, Karnataka</dd></div>
          <div><dt class="m-text-4">Admissions</dt><dd class="m-text"><a class="m-link" href="mailto:admissions.execed@tapmi.edu.in">admissions.execed@tapmi.edu.in</a></dd></div>
          <div><dt class="m-text-4">Advisory Desk</dt><dd class="m-text">+91 80 2558 1000 &middot; +91 820 270 1000</dd></div>
          <div><dt class="m-text-4">Office Hours</dt><dd class="m-text">Monday to Friday, 9:00 AM &ndash; 6:00 PM IST</dd></div>
        </dl>
      </div>
      <form class="m-surface contact__form" id="enquiry-form" action="/api/enquiry" method="post" style="padding:clamp(24px, 4vw, 40px)">
        <label class="m-field"><span class="m-field__label">Your full name *</span><input class="m-field__control" name="name" id="field-name" type="text" autocomplete="name" placeholder="e.g. Aarav Mehta" required></label>
        <label class="m-field"><span class="m-field__label">Work Email *</span><input class="m-field__control" name="email" id="field-email" type="email" autocomplete="email" placeholder="e.g. aarav.mehta@enterprise.com" required></label>
        <label class="m-field"><span class="m-field__label">Phone Number</span><input class="m-field__control" name="phone" id="field-phone" type="tel" autocomplete="tel" placeholder="e.g. +91 98201 23456"></label>
        <label class="m-field"><span class="m-field__label">Programme Scenario *</span>
          <select class="m-field__control" name="scenario_id" id="field-scenario" required>
            <option value="emba_b2b">Sponsored Executive MBA (Enterprise Cohort / Seat Bank)</option>
            <option value="mdp_b2b">Customised MDP Accelerator (20–30 Participants)</option>
            <option value="emba_b2c">Individual Executive MBA (Career Acceleration)</option>
          </select>
        </label>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px" id="org-fields">
          <label class="m-field"><span class="m-field__label">Organisation Name</span><input class="m-field__control" name="organisation" id="field-org" type="text" placeholder="e.g. Tata Consultancy Services"></label>
          <label class="m-field"><span class="m-field__label">Estimated Seats</span><input class="m-field__control" name="seats" id="field-seats" type="number" min="1" max="100" value="5"></label>
        </div>

        <div id="fee-preview-box" style="margin:12px 0;padding:12px 16px;background:var(--color-1);border:1px solid var(--color-12);border-radius:var(--radius-3);font-size:14px">
          <strong>Calculated Fee Estimate:</strong> <span id="fee-preview-text">₹31,90,000 for 5 seats (8% volume discount applied)</span>
        </div>

        <label class="m-field"><span class="m-field__label">Specific Objectives or Questions</span><textarea class="m-field__control" name="notes" id="field-notes" rows="3" placeholder="Tell us about your team's capability goals or preferred start timing"></textarea></label>
        
        <label style="display:flex;gap:10px;align-items:flex-start;font-size:13px;color:var(--color-3);margin:12px 0;cursor:pointer">
          <input type="checkbox" name="consent" id="field-consent" required style="margin-top:3px">
          <span>I acknowledge that this is a <strong>student project</strong> developed for academic evaluation and not an official university enrollment application.</span>
        </label>

        <button class="m-btn" type="submit" id="submit-btn" style="width:100%;margin-top:8px"><span class="m-btn__label">Submit Enquiry</span></button>
        
        <div class="contact__done" id="form-feedback" role="status" hidden style="margin-top:16px;padding:16px;border-radius:var(--radius-3);background:#E8EEF4;color:#111D30;font-size:14px"></div>
      </form>
    </div>
  </section>`;
src = src.replace(contactOldRegex, contactNewHtml);

// 16. Footer section (#footer)
const footerOldRegex = /<footer id="footer"[\s\S]*?<\/footer>/;
const footerNewHtml = `<footer id="footer" data-8b-section="footer">
  <div class="wrap">
    <div class="foot__grid">
      <div>
        <a class="foot__brand" href="#hero" aria-label="TAPMI Executive Education, back to top">
          <img src="assets/brand/tapmi-logo-white.svg" alt="TAPMI Logo" width="150" height="32" style="height:32px;width:auto;display:block;margin-bottom:16px">
        </a>
        <p class="m-text" style="margin-top:12px;max-width:360px">TAPMI-inspired executive education website prototype. Developed by Group 4 students for Business Marketing (M3). Academic evaluation only.</p>
        <p class="m-text-5" style="margin-top:12px;font-size:13px">Programme designs, fees and services shown here are student proposals for academic evaluation. They are not approved TAPMI offers or an invitation to enrol.</p>
        <div style="margin-top:20px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.15)">
          <p class="m-text-4" style="color:var(--color-3);margin-bottom:8px">TAPMI Institutional Accreditations</p>
          <img src="assets/brand/accredations-logo-white.svg" alt="TAPMI Accreditations" width="130" height="22" style="height:22px;width:auto;opacity:0.95;display:block">
          <span style="display:block;font-size:11px;color:var(--color-3);margin-top:4px">Institutional accreditations of T. A. Pai Management Institute (MAHE). Specific curriculum designs shown are student proposals.</span>
        </div>
      </div>
      <ul class="foot__links m-text">
        <li><a class="m-link" href="#course">Curriculum</a></li>
        <li><a class="m-link" href="organisations.html">For Organisations</a></li>
        <li><a class="m-link" href="emba-b2b.html">Sponsored EMBA</a></li>
        <li><a class="m-link" href="mdp-b2b.html">Customised MDP</a></li>
        <li><a class="m-link" href="emba-b2c.html">Individual EMBA</a></li>
        <li><a class="m-link" href="resources.html">Resources</a></li>
        <li><a class="m-link" href="about.html">About &amp; Privacy</a></li>
        <li><a class="m-link" href="#fees">Programmes &amp; Fees</a></li>
      </ul>
      <address class="m-text" style="font-style:normal">
        <strong>Academic Context</strong><br>
        Manipal Academy of Higher Education (MAHE) / TAPMI<br>
        Manipal, Karnataka 576104<br>
        <span style="font-size:13px;color:var(--color-3)">Course: Business Marketing (M3)<br>Group 4 Student Project</span>
      </address>
    </div>
    <div class="foot__legal m-text-4"><span>Group 4 Business Marketing (M3) · Academic Evaluation Prototype</span><span>© 2026 Student Project</span></div>
  </div>
</footer>`;
src = src.replace(footerOldRegex, footerNewHtml);

// 17. Form handling script before </body>
const formScript = `
<script>
// Live API status and Form Submission Logic for /api/enquiry
(() => {
  const badge = document.getElementById('live-api-badge');
  const form = document.getElementById('enquiry-form');
  const scenarioSelect = document.getElementById('field-scenario');
  const seatsInput = document.getElementById('field-seats');
  const orgFields = document.getElementById('org-fields');
  const feePreview = document.getElementById('fee-preview-text');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  // Check API mode
  fetch('/api/enquiry')
    .then(r => r.json())
    .then(data => {
      if (badge) {
        if (data.mode === 'connected') {
          badge.textContent = '🟢 CRM Connected';
          badge.style.background = '#dcfce7';
          badge.style.color = '#15803d';
        } else {
          badge.textContent = '🔵 Demo Mode (Browser Simulation)';
          badge.style.background = '#e0f2fe';
          badge.style.color = '#0369a1';
        }
      }
    })
    .catch(() => {
      if (badge) badge.textContent = 'Demo Mode (Offline)';
    });

  // Dynamic fee calculation
  function updateFee() {
    const sc = scenarioSelect.value;
    const seats = parseInt(seatsInput.value, 10) || 1;
    if (sc === 'emba_b2b') {
      orgFields.style.display = 'grid';
      let discount = 0;
      if (seats >= 10) discount = 0.12;
      else if (seats >= 5) discount = 0.08;
      else if (seats >= 3) discount = 0.05;
      const academicPerSeat = 650000 * (1 - discount);
      const totalPerSeat = academicPerSeat + 40000;
      const total = totalPerSeat * seats;
      feePreview.textContent = '₹' + total.toLocaleString('en-IN') + ' for ' + seats + ' seat(s) (' + (discount * 100) + '% discount applied)';
    } else if (sc === 'mdp_b2b') {
      orgFields.style.display = 'grid';
      const total = 70000 * seats;
      feePreview.textContent = '₹' + total.toLocaleString('en-IN') + ' for ' + seats + ' participants (₹70,000/seat)';
    } else {
      orgFields.style.display = 'none';
      feePreview.textContent = '₹6,50,000 (Standard) or ₹5,75,000 (Founding Concession)';
    }
  }

  scenarioSelect.addEventListener('change', updateFee);
  seatsInput.addEventListener('input', updateFee);
  updateFee();

  // Submit Handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    submitBtn.disabled = true;
    submitBtn.querySelector('.m-btn__label').textContent = 'Submitting...';

    const payload = {
      scenario_id: scenarioSelect.value,
      name: document.getElementById('field-name').value.trim(),
      email: document.getElementById('field-email').value.trim(),
      phone: document.getElementById('field-phone').value.trim(),
      organisation: document.getElementById('field-org').value.trim(),
      seats: parseInt(seatsInput.value, 10) || 1,
      notes: document.getElementById('field-notes').value.trim(),
      consent: document.getElementById('field-consent').checked
    };

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      feedback.hidden = false;
      if (res.ok) {
        feedback.style.background = '#dcfce7';
        feedback.style.color = '#15803d';
        feedback.innerHTML = '<strong>Success!</strong> Request ID: <code>' + (data.request_id || 'DEMO') + '</code><br>' + 
          (data.message || 'Enquiry recorded.') + '<br><small style="color:#166534">Notice: ' + (data.notice || 'Demo mode: Nothing sent to external CRM.') + '</small>';
      } else {
        feedback.style.background = '#fee2e2';
        feedback.style.color = '#991b1b';
        feedback.innerHTML = '<strong>Error:</strong> ' + (data.message || 'Submission failed.');
      }
    } catch (err) {
      feedback.hidden = false;
      feedback.style.background = '#fee2e2';
      feedback.style.color = '#991b1b';
      feedback.innerHTML = '<strong>Network Error:</strong> Could not reach /api/enquiry.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector('.m-btn__label').textContent = 'Submit Demo Enquiry';
    }
  });
})();
</script>
`;

src = src.replace('</body>', formScript + '\n</body>');

// Adjust hero padding so fixed nav + disclaimer banner do not cover hero content
src = src.replace('#hero { padding-top: 96px; }', '#hero { padding-top: 130px; }');
src = src.replace('#hero .hero__panel { position: relative; height: calc(100svh - 96px);', '#hero .hero__panel { position: relative; height: calc(100svh - 130px);');
src = src.replace('#hero { padding-top: 72px; }', '#hero { padding-top: 116px; }');
src = src.replace('#hero .hero__panel { height: calc(100svh - 72px);', '#hero .hero__panel { height: calc(100svh - 116px);');

fs.writeFileSync('index.html', src);
console.log('Successfully written index.html from coding-school-website-template/index.html');
