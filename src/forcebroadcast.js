function forcebroadcast() {
    var msg = ``;
    var listOfUsers = allUsers();
    // sendText(1165718697, msg);
    for (i = 0; i < listOfUsers.length; i++) { 
      try {
        sendText(parseInt(listOfUsers[i]), msg);
      } catch (e) {
        sendText(1165718697, listOfUsers[i]);
      }
    }
  }
  
  function allUsers() {
    var rangeValues = userRange();  
    var res = [];  
    for (i = 0; i < userLastRow() - 1; i++) {
      res.push(parseInt(rangeValues[i][0]));
    }
    return res;  
  }