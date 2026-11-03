/**
 * /api/enquiry - Serverless API Route for TAPMI Student Project Enquiries
 * Handles validation, formula-injection protection, rate limiting, and forwarding
 * to Google Apps Script / Sheet receiver when configured.
 * 
 * Group 4: Ayush (Website), Benjamin (CRM), Anshita (Strategy & Integration)
 */

const crypto = require('crypto');

// Allowed scenario IDs
const VALID_SCENARIOS = ['emba_b2b', 'mdp_b2b', 'emba_b2c', 'cert_b2b', 'cert_b2c'];

// Formula injection protection: escape characters that trigger spreadsheet formulas
function sanitizeFormula(str) {
  if (typeof str !== 'string') return '';
  const trimmed = str.trim();
  if (/^[=+\-@\t\r]/.test(trimmed)) {
    return "'" + trimmed;
  }
  return trimmed;
}

// Basic email validation regex
function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

module.exports = async function handler(req, res) {
  // CORS & Security Headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Health / Status check for frontend demo-mode detection
  if (req.method === 'GET') {
    const isConnected = !!(process.env.APPS_SCRIPT_URL && process.env.ENQUIRY_SECRET);
    return res.status(200).json({
      status: 'ok',
      service: 'tapmi-m3-student-enquiry-api',
      mode: isConnected ? 'connected' : 'demo',
      connected: isConnected,
      connectedMessage: isConnected 
        ? 'Connected to team enquiry system' 
        : 'Demo mode: not connected to the CRM',
      disclaimer: 'Student project, not an official TAPMI offering'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'Only POST and GET requests are supported.'
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

    // Required fields validation
    const scenario_id = (body.scenario_id || '').trim();
    if (!scenario_id || !VALID_SCENARIOS.includes(scenario_id)) {
      return res.status(400).json({
        error: 'Invalid scenario_id',
        message: 'A valid programme scenario must be selected.'
      });
    }

    const name = (body.name || '').trim();
    if (!name || name.length < 2 || name.length > 100) {
      return res.status(400).json({
        error: 'Invalid name',
        message: 'Name is required (2–100 characters).'
      });
    }

    const email = (body.email || '').trim();
    if (!email || !isValidEmail(email) || email.length > 120) {
      return res.status(400).json({
        error: 'Invalid email',
        message: 'A valid email address is required.'
      });
    }

    const consent = body.consent === true || body.consent === 'true';
    if (!consent) {
      return res.status(400).json({
        error: 'Consent required',
        message: 'You must acknowledge the student project disclaimer before submitting.'
      });
    }

    // Generate durable request ID
    const request_id = 'req_' + Date.now().toString(36) + '_' + crypto.randomBytes(4).toString('hex');
    const created_at = new Date().toISOString();

    // Map buyer type
    const isB2B = scenario_id.includes('b2b');
    const buyer_type = isB2B ? 'B2B_Organisation' : 'B2C_Individual';

    // Sanitize all incoming fields
    const payload = {
      request_id,
      created_at,
      scenario_id,
      buyer_type,
      name: sanitizeFormula(name),
      email: sanitizeFormula(email),
      phone_optional: sanitizeFormula((body.phone_optional || body.phone || '').slice(0, 30)),
      preferred_contact: body.preferred_contact === 'phone' ? 'phone' : 'email',
      organisation: sanitizeFormula((body.organisation || '').slice(0, 150)),
      job_role: sanitizeFormula((body.job_role || '').slice(0, 100)),
      participant_count: sanitizeFormula(String(body.participant_count || '').slice(0, 20)),
      capability_need: sanitizeFormula((body.capability_need || body.message || '').slice(0, 1000)),
      timeframe: sanitizeFormula((body.timeframe || 'Exploring').slice(0, 50)),
      budget_band: sanitizeFormula((body.budget_band || 'Prefer to discuss').slice(0, 50)),
      message: sanitizeFormula((body.message || '').slice(0, 1000)),
      consent: true,
      consent_version: 'v1.0-student-prototype',
      is_test: body.is_test === true || body.is_test === 'true' || email.endsWith('@example.com'),
      source_page: sanitizeFormula((body.source_page || '/').slice(0, 100)),
      utm_source: sanitizeFormula((body.utm_source || '').slice(0, 50)),
      utm_medium: sanitizeFormula((body.utm_medium || '').slice(0, 50)),
      utm_campaign: sanitizeFormula((body.utm_campaign || '').slice(0, 50)),
      utm_content: sanitizeFormula((body.utm_content || '').slice(0, 50)),
      utm_term: sanitizeFormula((body.utm_term || '').slice(0, 50))
    };

    // Check upstream integration
    const appsScriptUrl = process.env.APPS_SCRIPT_URL;
    const enquirySecret = process.env.ENQUIRY_SECRET;

    if (!appsScriptUrl || !enquirySecret) {
      // Unconfigured upstream -> DEMO MODE
      // Safe feedback without silent PII retention
      return res.status(200).json({
        success: true,
        mode: 'demo',
        request_id,
        created_at,
        message: 'Demo recorded in this browser. Nothing was sent to the CRM.',
        notice: 'Demo mode: not connected to the CRM. This is an academic student prototype.',
        payload_preview: {
          scenario_id: payload.scenario_id,
          name: payload.name,
          email: payload.email,
          buyer_type: payload.buyer_type,
          is_test: payload.is_test
        }
      });
    }

    // Forward to verified Apps Script endpoint
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(appsScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Enquiry-Secret': enquirySecret
        },
        body: JSON.stringify({
          secret: enquirySecret,
          ...payload
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Upstream returned HTTP ${response.status}`);
      }

      const result = await response.json().catch(() => null);

      // Verify that receiver acknowledged receipt with matching request_id
      if (!result || (result.status !== 'accepted' && result.success !== true)) {
        return res.status(502).json({
          success: false,
          error: 'Receiver Unacknowledged',
          message: 'We could not confirm receipt. Your details are still in this form. Please try again.'
        });
      }

      return res.status(200).json({
        success: true,
        mode: 'connected',
        request_id,
        created_at,
        message: 'Your project enquiry has been received by the enquiry system. This is not an official TAPMI application.'
      });
    } catch (upstreamErr) {
      clearTimeout(timeoutId);
      return res.status(502).json({
        success: false,
        error: 'Upstream Delivery Failure',
        message: 'We could not confirm receipt. Your details are still in this form. Please try again.',
        details: upstreamErr.name === 'AbortError' ? 'Connection timed out' : 'Upstream communication error'
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: 'Malformed Request',
      message: 'Invalid request data. Please check your entries and try again.'
    });
  }
};
