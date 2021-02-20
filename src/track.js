var Track = SpreadsheetApp.openById(sheet_id).getSheetByName('Track');

var trackRangeData = Track.getDataRange();
var trackLastColumn = trackRangeData.getLastColumn();
var trackLastRow = trackRangeData.getLastRow();
var trackSearchRange = Track.getRange(2, 1, trackLastRow - 1, trackLastColumn);
var trackRangeValues = trackSearchRange.getValues();

function addUserToTrack(userId) {
  var next = userLastRow();
  Track.appendRow([userId]);
  var temp = Track.getRange(trackLastRow + 1, 1).getValues();
  Track.getRange(1, next).setValue(temp);
}
