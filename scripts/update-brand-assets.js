const fs = require('fs');
const path = require('path');

const secondaryPages = [
  'organisations.html',
  'emba-b2b.html',
  'mdp-b2b.html',
  'emba-b2c.html',
  'resources.html',
  'enquire.html',
  'about.html',
  'cert-b2c.html',
  'cert-b2b.html',
  '404.html'
];

const navLogoOld = /<a class="nav__logo" href="\/?" aria-label="TAPMI executive education student project home">[\s\S]*?<\/a>/;
const navLogoNew = `<a class="nav__logo" href="/" aria-label="TAPMI executive education student project home" style="display:flex;align-items:center;gap:12px;text-decoration:none">
      <img src="assets/brand/tapmi-logo.svg" alt="TAPMI Logo" width="130" height="28" style="height:28px;width:auto;display:block">
      <span style="font-size:11px;color:var(--color-3);padding-left:8px;border-left:1px solid var(--color-12);font-weight:600;letter-spacing:0.04em;text-transform:uppercase">M3 Student Project</span>
    </a>`;

const menuTopOld = /<div class="menu__top">[\s\S]*?<button class="menu__close" type="button">Close<\/button>\s*<\/div>/;
const menuTopNew = `<div class="menu__top">
      <img src="assets/brand/tapmi-logo-white.svg" alt="TAPMI Logo" width="120" height="26" style="height:26px;width:auto;display:block">
      <button class="menu__close" type="button">Close</button>
    </div>`;

const footBrandOld = /<a class="foot__brand"[\s\S]*?<\/div>\s*<\/div>/;
const footBrandNew = `<a class="foot__brand" href="/" aria-label="TAPMI executive education student project home" style="text-decoration:none">
          <img src="assets/brand/tapmi-logo-white.svg" alt="TAPMI Logo" width="150" height="32" style="height:32px;width:auto;display:block;margin-bottom:12px">
        </a>
        <div class="foot__subline" style="font-size:12px;color:var(--color-3);font-weight:600;text-transform:uppercase;letter-spacing:0.04em">Executive Education · Student Project</div>
        <div style="margin-top:14px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.15)">
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-3);margin-bottom:6px">TAPMI Institutional Accreditations</p>
          <img src="assets/brand/accredations-logo-white.svg" alt="TAPMI Accreditations" width="130" height="22" style="height:22px;width:auto;opacity:0.95;display:block">
        </div>`;

for (const file of secondaryPages) {
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (navLogoOld.test(html)) {
    html = html.replace(navLogoOld, navLogoNew);
    changed = true;
  }
  if (menuTopOld.test(html)) {
    html = html.replace(menuTopOld, menuTopNew);
    changed = true;
  }
  if (footBrandOld.test(html)) {
    html = html.replace(footBrandOld, footBrandNew);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, html, 'utf8');
    console.log(`Updated brand assets in ${file}`);
  } else {
    console.log(`No patterns matched in ${file}`);
  }
}
