// docs/superpowers/plans/apps-script-orders-v2.gs
// Paste into the existing Apps Script project bound to the order sheet
// (script.google.com). Then: Deploy -> Manage deployments -> New deployment
// -> Web app -> execute as Me, access: Anyone. Copy the new /exec URL.
//
// Set TOKEN below to the same random string as the ORDER_SHEET_TOKEN env var.
//
// Statuses: NEW (intake saved, payment unconfirmed) -> PAID (Adam confirmed
// PayPal payment) -> READY (report staged) -> SENT (Adam emailed it).
// ATTENTION = fulfillment hit a problem; see the order folder.

var TOKEN = "REPLACE_WITH_RANDOM_SECRET";
var SHEET_NAME = "Orders";
var HEADERS = [
  "orderId", "timestamp", "status", "amount", "customerEmail",
  "contractorName", "companyName", "state", "trade", "licenseNumber",
  "notes", "utm_source", "utm_medium", "utm_content",
];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  if (data.token !== TOKEN) {
    return ContentService.createTextOutput(JSON.stringify({ error: "unauthorized" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  var sheet = getSheet_();

  if (data.kind === "order") {
    sheet.appendRow(HEADERS.map(function (h) { return data[h] || ""; }));
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (data.kind === "status") {
    // { kind:"status", token, orderId, status }
    var rows = sheet.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      if (rows[i][0] === data.orderId) {
        sheet.getRange(i + 1, 3).setValue(data.status); // col 3 = status
        return ContentService.createTextOutput(JSON.stringify({ ok: true }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ error: "not found" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ error: "unknown kind" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  if (!e.parameter || e.parameter.token !== TOKEN) {
    return ContentService.createTextOutput(JSON.stringify({ error: "unauthorized" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  var wanted = e.parameter.status || "NEW";
  var sheet = getSheet_();
  var rows = sheet.getDataRange().getValues();
  var out = [];
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][2] === wanted) {
      var obj = {};
      for (var j = 0; j < HEADERS.length; j++) obj[HEADERS[j]] = rows[i][j];
      out.push(obj);
    }
  }
  return ContentService.createTextOutput(JSON.stringify({ orders: out }))
    .setMimeType(ContentService.MimeType.JSON);
}
