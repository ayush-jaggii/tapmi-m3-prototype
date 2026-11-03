/**
 * Automated Test Suite for /api/enquiry Handler
 * Validates request validation, formula injection protection, and demo mode.
 */

const handler = require('../api/enquiry');

function mockRes() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(k, v) { this.headers[k] = v; },
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; },
    end() { return this; }
  };
}

async function runTests() {
  console.log('=== RUNNING ENQUIRY API TESTS ===');
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

  // Test 1: GET health check
  {
    const req = { method: 'GET' };
    const res = mockRes();
    await handler(req, res);
    assert('GET returns status 200', res.statusCode === 200);
    assert('GET returns mode=demo when unset', res.body.mode === 'demo');
    assert('GET returns disclaimer', !!res.body.disclaimer);
  }

  // Test 2: Reject invalid method
  {
    const req = { method: 'DELETE' };
    const res = mockRes();
    await handler(req, res);
    assert('DELETE returns status 405 Method Not Allowed', res.statusCode === 405);
  }

  // Test 3: Reject missing required fields
  {
    const req = { method: 'POST', body: { name: 'Test' } };
    const res = mockRes();
    await handler(req, res);
    assert('Missing scenario_id returns 400', res.statusCode === 400);
  }

  // Test 4: Reject unconsented submission
  {
    const req = {
      method: 'POST',
      body: {
        scenario_id: 'emba_b2b',
        name: 'Demo Person',
        email: 'test@example.com',
        consent: false
      }
    };
    const res = mockRes();
    await handler(req, res);
    assert('consent=false returns 400', res.statusCode === 400);
  }

  // Test 5: Successful Demo Mode submission with formula injection payload
  {
    const req = {
      method: 'POST',
      body: {
        scenario_id: 'emba_b2b',
        name: '=cmd|"/C calc"!A0',
        email: '+attack@example.com',
        organisation: '@EvilCorp',
        capability_need: '-SUM(1+1)',
        consent: true
      }
    };
    const res = mockRes();
    await handler(req, res);
    assert('Valid demo submission returns 200', res.statusCode === 200);
    assert('Response mode is demo', res.body.mode === 'demo');
    assert('Formula injection escaped in payload', res.body.payload_preview.name.startsWith("'"));
    assert('Generates durable request_id', !!res.body.request_id && res.body.request_id.startsWith('req_'));
  }

  // Test 6: Verify synthetic fixtures
  {
    const fixtures = require('./fixtures.json');
    for (const fix of fixtures) {
      const req = { method: 'POST', body: fix };
      const res = mockRes();
      await handler(req, res);
      assert(`Synthetic fixture ${fix.name} passes validation`, res.statusCode === 200 && res.body.success === true);
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed.\n`);
  if (failed > 0) process.exit(1);
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
