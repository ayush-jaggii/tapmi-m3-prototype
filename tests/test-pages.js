/**
 * Automated Verification Script for HTML Pages, Disclaimers, and Fees
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const REQUIRED_PAGES = [
  'index.html',
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

const REQUIRED_DISCLAIMERS = [
  'Student project, not an official TAPMI offering'
];

const FORBIDDEN_STRINGS = [
  'Sheffield',
  '0114 000 0000',
  'hello@refactor.example',
  '£7,200',
  '£6,480',
  '£300 a month',
  'Tuesday 12 January 2027',
  'AACSB',
  'AMBA',
  'NBA'
];

function runPageTests() {
  console.log('=== RUNNING STATIC PAGES & FIDELITY AUDIT ===');
  let passed = 0;
  let failed = 0;

  function assert(desc, condition) {
    if (condition) {
      console.log(`  ✓ ${desc}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${desc}`);
      failed++;
    }
  }

  for (const file of REQUIRED_PAGES) {
    const filePath = path.join(ROOT, file);
    const exists = fs.existsSync(filePath);
    assert(`File exists: ${file}`, exists);
    if (!exists) continue;

    const content = fs.readFileSync(filePath, 'utf8');

    // Check required disclaimers
    for (const disc of REQUIRED_DISCLAIMERS) {
      assert(`${file} contains required disclaimer: "${disc}"`, content.includes(disc));
    }

    // Check pricing disclaimer on programme & pricing pages
    if (['index.html', 'organisations.html', 'emba-b2b.html', 'mdp-b2b.html', 'emba-b2c.html', 'cert-b2c.html', 'cert-b2b.html'].includes(file)) {
      assert(`${file} contains pricing proposal disclaimer`, content.includes('Programme designs, fees and services shown here are student proposals for academic evaluation'));
    }

    // Check no forbidden template demo remnants
    for (const forb of FORBIDDEN_STRINGS) {
      assert(`${file} does NOT contain forbidden template demo copy: "${forb}"`, !content.includes(forb));
    }

    // Check WCAG / link integrity: no '#' only links
    const emptyHrefCount = (content.match(/href="#"/g) || []).length;
    assert(`${file} has zero '#' dummy links`, emptyHrefCount === 0);
  }

  // Verify Fee Math from emba-b2b.html
  const embaB2B = fs.readFileSync(path.join(ROOT, 'emba-b2b.html'), 'utf8');
  assert('EMBA B2B base 1-2 seats matches Rs 6,90,000', embaB2B.includes('Rs 6,90,000'));
  assert('EMBA B2B 3-4 seats matches Rs 6,57,500', embaB2B.includes('Rs 6,57,500'));
  assert('EMBA B2B 5-9 seats matches Rs 6,38,000', embaB2B.includes('Rs 6,38,000'));
  assert('EMBA B2B 10+ seats matches Rs 6,12,000', embaB2B.includes('Rs 6,12,000'));

  // Verify Fee Math from mdp-b2b.html
  const mdpB2B = fs.readFileSync(path.join(ROOT, 'mdp-b2b.html'), 'utf8');
  assert('MDP 20 participants matches Rs 14,00,000', mdpB2B.includes('Rs 14,00,000'));
  assert('MDP 25 participants matches Rs 17,50,000', mdpB2B.includes('Rs 17,50,000'));
  assert('MDP 30 participants matches Rs 21,00,000', mdpB2B.includes('Rs 21,00,000'));

  // Verify Fee Math from emba-b2c.html
  const embaB2C = fs.readFileSync(path.join(ROOT, 'emba-b2c.html'), 'utf8');
  assert('EMBA B2C standard fee matches Rs 6,50,000', embaB2C.includes('Rs 6,50,000'));
  assert('EMBA B2C founding concession matches Rs 5,75,000', embaB2C.includes('Rs 5,75,000'));

  console.log(`\nResults: ${passed} passed, ${failed} failed.\n`);
  if (failed > 0) process.exit(1);
}

runPageTests();
