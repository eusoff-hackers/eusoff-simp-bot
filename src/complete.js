function viewOwnTaken(userID) {
  var rangeValues = requestRange();
  var count = 0;
  var keyboard = [];

  for (i = 0; i < requestLastRow() - 1; i++) {
    var refId = rangeValues[i][0];
    var req = requestInfo(refId);    
    if (req.userId === userID && req.status === "Taken") {
        keyboard[count] = [
            {
              text: req.request + " (" + req.credits + " cr), " + req.time.slice(0, -2) + ", " + req.date.slice(0, -2),
              callback_data: 'complete-' + i,
            },
        ];
        count++;
    }
  }

  if (count === 0) {
    return false;
  } else {
    return {inline_keyboard: keyboard};
  }
}

function completeRequest(userID, data) {
    var data_arr = data.split('-');
    
    var refId = parseInt(data_arr[1]) + 1;
    var req = requestInfo(refId);
    var slave = userInfo(req.slaveId);
    var new_credits = parseInt(slave.total_credits) + parseInt(req.pending);

    setRequestStatus(refId, "Completed");
    setRequestPending(refId, 0);
    setUserCredits(req.slaveId, new_credits);

    sendText(userID, 'Request complete');
}
