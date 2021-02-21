function processSimpRequest(userID) {
    var rangeValues = requestRange();
    var count = 0;
    var keyboard = [];

    var user = userInfo(userID);
    var userFloor = user.room.slice(1, 2);
  
    for (i = 0; i < requestLastRow() - 1; i++) {
      var req = requestInfo(rangeValues[i][0]);
      var requestor = userInfo(req.userId);
      var requestorName = requestor.name;
      var requestorFloor = requestor.room.slice(1, 2);
    
      var gender_diff = oppositeGender(userFloor, requestorFloor);
    
      if (req.userId !== userID && req.status === "Available") {
        keyboard[count] = [
            {
              text: req.request + " (" + req.credits + " cr) " 
              + requestorName + '\n '+ req.time.slice(0, -2),
              callback_data: 'simp-' + i + ' ' + gender_diff,
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
              
function takeSimpRequest(userID, data) {
    var user = userInfo(userID);
    var rangeValues = requestRange();

    var data_arr = data.split('-');
    var refId = parseInt(data_arr[1].split(' ')[0]) + 1;
    var gender_diff = data_arr[1].split(' ')[1];
    var req = requestInfo(rangeValues[refId - 1][0]);
    var pending_credit = req.credits;

    var requestor_id = parseInt(rangeValues[refId - 1][3]);
    var requestor_user = userInfo(requestor_id);
    var total_credits = requestor_user.total_credits;
    var new_credits = parseInt(total_credits) + parseInt(pending_credit);

    if (req.status == "Taken") {
      sendText(userID, "Sorry, this request has already been taken. Too slow!");
    } else {
      setUserCredits(requestor_id, new_credits);    

      setRequestStatus(refId, "Taken");
      setRequestPending(refId, 0);
      setRequestSlave(refId, userID);

      sendText(userID, 'Request taken: ' + req.request + '\nRef number: ' + req.ref + '\nRemark: ' + req.remark + '\nWhat a simp ( ͡° ͜ʖ ͡°)...');
    }
}

function takeSimpRequestTest(userID, refId) {
    var user = userInfo(userID);
    var rangeValues = requestRange();

    var req = requestInfo(rangeValues[refId - 1][0]);
    var pending_credit = req.credits;

    var requestor_id = parseInt(rangeValues[refId - 1][3]);
    var requestor_user = userInfo(requestor_id);
    var total_credits = requestor_user.total_credits;
    var new_credits = parseInt(total_credits) + parseInt(pending_credit);

    if (req.status == "Taken") {
      sendText(userID, "Sorry, this request has already been taken. Too slow!");
    } else {
      if (req.userId === userID) {
        sendText(userID, "Sorry, you can't simp for yourself!");
      } else {
        setUserCredits(requestor_id, new_credits);    

      setRequestStatus(refId, "Taken");
      setRequestPending(refId, 0);
      setRequestSlave(refId, userID);

      sendText(userID, 'Request taken: ' + req.request + '\nRef number: ' + req.ref + '\nRemark: ' + req.remark + '\nWhat a simp ( ͡° ͜ʖ ͡°)...');
      }
    }
}
