const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const TOKEN = process.env.VERCEL_TOKEN || '';
const PROJECT_ID = 'prj_rAAiuZV4EjXEve2pnMys6kmp86WA';
const PROJECT_NAME = 'tapmi-m3-prototype';

const filesToInclude = [
  'index.html',
  'organisations.html',
  'emba-b2b.html',
  'mdp-b2b.html',
  'emba-b2c.html',
  'resources.html',
  'resources/Cross-Functional-Transition-Teaching-Case.pdf',
  'resources/Individual-Executive-MBA-Prospectus.pdf',
  'resources/Leadership-Transition-Executive-Summary-2026.pdf',
  'resources/MDP-Accelerator-6-Week-Blueprint.pdf',
  'resources/PL-Fluency-10-Point-Self-Assessment.pdf',
  'resources/Sponsored-EMBA-Cohort-Specification.pdf',
  'resources/Sponsorship-Impact-Measurement-Framework.pdf',
  'enquire.html',
  'about.html',
  'cert-b2c.html',
  'cert-b2b.html',
  '404.html',
  'assets/brand/tapmi-logo.svg',
  'assets/brand/tapmi-logo.webp',
  'assets/brand/tapmi-logo-white.svg',
  'assets/brand/accredations-logo.svg',
  'assets/brand/accredations-logo-white.svg',
  'assets/brand/mahebengaluru-campus.jpg',
  'assets/brand/professional-office-laptop.jpg',
  'assets/brand/strategy-meeting-leadership.jpg',
  'assets/brand/corporate-team-celebration.jpg',
  'assets/brand/professional-office-desk.jpg',
  'assets/brand/conference-speaker-podium.jpg',
  'assets/brand/cloned-audience-lecture-hall.jpg',
  'assets/brand/executive-portrait-modern-office.jpg',
  'assets/brand/weekday-synthesis-reading.jpg',
  'robots.txt',
  'vercel.json',
  'css/style.css',
  'js/config.js',
  'js/motion.js',
  'js/enquiry.js',
  'api/enquiry.js'
];

async function uploadFile(fileRelPath) {
  const fullPath = path.join(process.cwd(), fileRelPath);
  const buf = fs.readFileSync(fullPath);
  const sha = crypto.createHash('sha1').update(buf).digest('hex');
  const size = buf.length;

  console.log(`Uploading ${fileRelPath} (size: ${size}, sha: ${sha.slice(0, 8)}...)...`);

  const res = await fetch('https://api.vercel.com/v2/files', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Length': String(size),
      'x-vercel-digest': sha
    },
    body: buf
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`Upload error for ${fileRelPath}: HTTP ${res.status}`, text);
    throw new Error(`Upload failed for ${fileRelPath}`);
  }

  return { file: fileRelPath, sha, size };
}

async function deploy() {
  console.log('=== UPLOADING FILES TO VERCEL ===');
  const uploadedFiles = [];
  for (const f of filesToInclude) {
    const item = await uploadFile(f);
    uploadedFiles.push(item);
  }

  console.log('\n=== CREATING VERCEL DEPLOYMENT ===');
  const deployPayload = {
    name: PROJECT_NAME,
    project: PROJECT_ID,
    target: 'production',
    files: uploadedFiles
  };

  const res = await fetch('https://api.vercel.com/v13/deployments', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(deployPayload)
  });

  const data = await res.json();
  if (!res.ok) {
    console.error('Deployment creation failed:', res.status, data);
    process.exit(1);
  }

  console.log('Deployment Created Successfully!');
  console.log('Deployment ID:', data.id);
  console.log('URL:', `https://${data.url}`);
  console.log('Ready State:', data.readyState);

  // Poll until READY
  console.log('\nPolling deployment status...');
  let ready = false;
  let attempts = 0;
  while (!ready && attempts < 30) {
    await new Promise(r => setTimeout(r, 2000));
    const checkRes = await fetch(`https://api.vercel.com/v13/deployments/${data.id}`, {
      headers: { 'Authorization': `Bearer ${TOKEN}` }
    });
    const checkData = await checkRes.json();
    console.log(`  Attempt ${attempts + 1}: ${checkData.readyState}`);
    if (checkData.readyState === 'READY') {
      ready = true;
      console.log('\n=======================================');
      console.log('PROD DEPLOYMENT READY!');
      console.log('Production URL:', `https://${checkData.url}`);
      console.log('Aliases:', checkData.alias);
      console.log('=======================================');
      break;
    } else if (checkData.readyState === 'ERROR') {
      console.error('Deployment errored:', checkData);
      process.exit(1);
    }
    attempts++;
  }
}

deploy().catch(err => {
  console.error('Fatal deployment error:', err);
  process.exit(1);
});
