/**
 * Halleder bekleme listesi arka ucu.
 *
 * Bunu bir Google Tablosu'nun Apps Script düzenleyicisine yapıştır ve Web
 * uygulaması olarak yayınla. Sayfadaki form kayıtları buraya gönderir ve
 * "Bekleme listesi" sekmesine satır olarak eklenir. Adımlar için README.md'ye bak.
 */

var SHEET_NAME = 'Bekleme listesi';
var HEADERS = ['Kayıt zamanı', 'E-posta', 'İlk devretmek istediği iş', 'Form'];

function doPost(e) {
  var p = (e && e.parameter) || {};

  // Botlar gizli "company" alanını doldurur. Onları hata vermeden yok say.
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

// Web uygulaması URL'sini tarayıcıda açınca bu görünür. Yayının çalıştığını
// kontrol etmenin hızlı yolu.
function doGet() {
  return ContentService.createTextOutput('Halleder bekleme listesi çalışıyor.');
}

// "=HYPERLINK(...)" gibi bir değerin tabloda formül olarak çalışmasını engeller.
function safe_(value) {
  var text = String(value || '').slice(0, 200);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
