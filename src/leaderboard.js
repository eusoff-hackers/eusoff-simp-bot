function getLeaderboardRow(userID) {
  var leaderboard_sheet = SpreadsheetApp.openById(sheet_id).getSheetByName("Normal_Leaderboard");
  var rangeData = leaderboard_sheet.getDataRange();
  var lastRow = rangeData.getLastRow();
  var lastColumn = rangeData.getLastColumn();
  var searchRange = leaderboard_sheet.getRange(2, 1, lastRow - 1, lastColumn);
  var rangeValues = searchRange.getValues();
  var result = "Leaderboard 👑".bold() + '\n\n';
  
  for (i = 0; i < 10; i++) {
      var name = rangeValues[i][0];
      var room = rangeValues[i][1];
      var totalCredits = rangeValues[i][2];
      var pts = rangeValues[i][9];
      result = result + (i+1).toString() + ". " + name + " (" + room + ") " +  ": " + pts + " Points" + '\n';
  } 
  return result + "\n\n *Please note that final rankings may slightly differ due to checks and added metrics taken into account."; 
}

function sendLeaderboard(chatID, userID) {
  var backkeyboard = [
          [
            {
              text: 'Back',
              callback_data: 'back-',
            },
          ]
  ]
  sendText(chatID, getLeaderboardRow(userID), { inline_keyboard: backkeyboard });
}
