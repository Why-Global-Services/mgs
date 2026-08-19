function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Admissions");
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data["Submitted At"],
    data["Parent Name"],
    data["Student Name"],
    data.Phone,
    data.Email,
    data.Grade,
    data.Curriculum,
    data["Preferred Action"],
    data.Message
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
