/**
 * Google Apps Script Receiver Sample (UNVERIFIED UNTIL BENJAMIN CONFIRMS)
 * Group 4: Ayush (Website) -> Apps Script Receiver -> Benjamin's Google Sheet -> CRM
 * 
 * Instructions for Benjamin:
 * 1. Open target Google Sheet.
 * 2. Extensions -> Apps Script.
 * 3. Paste this code.
 * 4. In Project Settings -> Script Properties, set:
 *    ENQUIRY_SECRET = <your-chosen-secret>
 *    SHEET_NAME = "Enquiries" (or desired tab name)
 * 5. Deploy -> New Deployment -> Web App (Execute as: Me, Access: Anyone).
 * 6. Copy Web App URL into Vercel environment variable: APPS_SCRIPT_URL
 * 7. Copy ENQUIRY_SECRET into Vercel environment variable: ENQUIRY_SECRET
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Acquire lock for up to 10 seconds to handle concurrent requests safely
    lock.waitLock(10000);

    var scriptProperties = PropertiesService.getScriptProperties();
    var expectedSecret = scriptProperties.getProperty('ENQUIRY_SECRET');
    var sheetName = scriptProperties.getProperty('SHEET_NAME') || 'Enquiries';

    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Empty payload received'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var payload = JSON.parse(e.postData.contents);

    // Verify Shared Secret (Header or Payload)
    var incomingSecret = payload.secret;
    if (expectedSecret && incomingSecret !== expectedSecret) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Unauthorized secret token'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Required fields check
    if (!payload.request_id || !payload.email || !payload.scenario_id) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Missing essential fields (request_id, email, scenario_id)'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);

    // Create sheet and header row if not present
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow([
        'Request ID',
        'Timestamp UTC',
        'Scenario ID',
        'Buyer Type',
        'Name',
        'Email',
        'Phone',
        'Preferred Contact',
        'Organisation',
        'Job Role',
        'Participant Count',
        'Capability Need / Learning Goal',
        'Timeframe',
        'Budget Band',
        'Message',
        'Consent Acknowledged',
        'Consent Version',
        'Is Test / Synthetic',
        'Source Page',
        'UTM Source',
        'UTM Medium',
        'UTM Campaign',
        'CRM Synced',
        'Qualification Status'
      ]);
    }

    // Deduplication check: verify request_id doesn't already exist
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === payload.request_id) {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'accepted',
          request_id: payload.request_id,
          message: 'Duplicate submission acknowledged without duplicate append'
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Formula injection safeguard helper
    function clean(val) {
      if (val === null || val === undefined) return '';
      var s = String(val).trim();
      if (/^[=+\-@\t\r]/.test(s)) {
        return "'" + s;
      }
      return s;
    }

    // Append new durable enquiry row
    sheet.appendRow([
      clean(payload.request_id),
      clean(payload.created_at || new Date().toISOString()),
      clean(payload.scenario_id),
      clean(payload.buyer_type),
      clean(payload.name),
      clean(payload.email),
      clean(payload.phone_optional),
      clean(payload.preferred_contact),
      clean(payload.organisation),
      clean(payload.job_role),
      clean(payload.participant_count),
      clean(payload.capability_need),
      clean(payload.timeframe),
      clean(payload.budget_band),
      clean(payload.message),
      payload.consent ? 'YES' : 'NO',
      clean(payload.consent_version),
      payload.is_test ? 'TRUE' : 'FALSE',
      clean(payload.source_page),
      clean(payload.utm_source),
      clean(payload.utm_medium),
      clean(payload.utm_campaign),
      'PENDING', // For Benjamin's CRM sync trigger
      'NEW'      // Initial qualification stage
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'accepted',
      request_id: payload.request_id,
      timestamp: payload.created_at,
      message: 'Enquiry row recorded durably in Google Sheet'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
