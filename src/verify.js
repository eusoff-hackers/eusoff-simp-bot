var Photos = SpreadsheetApp.openById(sheet_id).getSheetByName('Photos');

var photosRangeData = Photos.getDataRange();
var photosLastColumn = photosRangeData.getLastColumn();
var photosLastRow = photosRangeData.getLastRow();
var photosSearchRange = Photos.getRange(2, 1, photosLastRow, photosLastColumn);
var photosRangeValues = photosSearchRange.getValues();

function verify(userId, photoid) {
  var filepathurl = telegramUrl + "/getFile?file_id=" + photoid;
  var filepath = JSON.parse(UrlFetchApp.fetch(filepathurl));
  var fileurl = "https://api.telegram.org/file/bot" + TOKEN + "/" + filepath.result.file_path;
  Photos.getRange(findUserLastVerifyRow(userId), 5).setValue(fileurl);
  setUserIncomingPhoto(userId, "0");
  sendText(userId, "Verified! Thank you and keep simping!");
}

function findUserLastVerifyRow(userId) {
  for (i = photosLastRow - 1; i >= 0; i--) {
    if (photosRangeValues[i][1] === userId) {
        return i + 2;
    }
  }  
  return false;
}

function addVerifyRow(refId) {
  var req = requestInfo(refId);
  Photos.appendRow([req.ref, req.slaveId, getDateTime().time, getDateTime().date]);
  setRequestVerified(req.ref, "Yes");
}

function requestsToVerify(userId) {
  var rangeValues = requestRange();
  var count = 0;
  var keyboard = [];

  for (i = 0; i < requestLastRow() - 1; i++) {
    var req = requestInfo(rangeValues[i][0])
    if (req.slaveId === userId && (req.status === "Taken" || req.status === "Completed") && req.verified != "Yes") {
      keyboard[count] = [
          {
            text: req.request + '\nCredit(s): ' + req.credits + '\nRef number: ' + req.ref + '\nRemark: ' + req.remark,
            callback_data: 'verify-' + req.ref,
          },
      ];
      count++;
    }
  }
  if (count === 0) {
    sendText(userId, "You have not done any favours to verify!")
  } else {
    sendText(userId, "Which request do you want verify?", {inline_keyboard: keyboard});
  }
}
