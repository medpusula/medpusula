/**
 * Quietloop waitlist backend.
 *
 * Paste this into a Google Sheet's Apps Script editor and deploy it as a
 * Web app. The landing page POSTs signups here and they land as rows in the
 * "Waitlist" tab. See README.md for the steps.
 */

var SHEET_NAME = 'Waitlist';
var HEADERS = ['Signed up', 'Email', 'First thing to hand off', 'Form'];

function doPost(e) {
  var p = (e && e.parameter) || {};

  // Bots fill the hidden "company" field. Ignore them without an error.
  if (p.company) return reply_({ ok: true });

  var email = String(p.email || '').trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return reply_({ ok: false, error: 'invalid_email' });
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }

    var rows = sheet.getLastRow() - 1;
    var existing = rows > 0 ? sheet.getRange(2, 2, rows, 1).getValues() : [];
    var seen = existing.some(function (row) { return String(row[0]).toLowerCase() === email; });

    if (!seen) {
      sheet.appendRow([new Date(), safe_(email), safe_(p.interest), safe_(p.source)]);
    }
  } finally {
    lock.releaseLock();
  }

  return reply_({ ok: true });
}

// Opening the Web app URL in a browser shows this, which is a quick way to
// check that the deployment works.
function doGet() {
  return ContentService.createTextOutput('Quietloop waitlist is running.');
}

// Stops a value like "=HYPERLINK(...)" from being run as a spreadsheet formula.
function safe_(value) {
  var text = String(value || '').slice(0, 200);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
