function sendInteractiveMenu(userId) {
    sendText(userId, getInteractiveMenu()[0], {inline_keyboard: getMenuKeyboard(1)});
  }
  
  function getInteractiveMenu() {
    var menu = "[Main]\n\n".bold() + 
               "/profile - To check your profile details  \n" +
               "/view - To view, take or simp for active requests  \n" + 
               "/make_request - To make a request \n" + 
               "/leaderboard - To view the leaderboards \n";
    var cancelComplete = "[Cancel/Complete Request]\n\n".bold() + 
                         "/complete - To mark your request as complete \n" +
                         "/cancel - To delete your current requests that are not taken \n" + 
                         "/verify - To send picture verification of completing a favour\n";
    var subscribeSupport = "[Subscribe/Support]\n\n".bold() + 
                           "/subscribe - To get notified of new favours \n" + 
                           "/unsubscribe - To unsubscribe from updates \n" + 
                           "/support - To report a bug/receive assistance \n" +
                           "/help - To read the tutorial again.\n" + 
                           "/unregister - To unregister from this bot.\n";
    var menuArr = [menu, cancelComplete, subscribeSupport];
    return menuArr;
  }
  
  function updateInteractiveMenu(userID, data, message_id) {
    var data_arr = data.split('-');
    var keyboardNumber = data_arr[1];
  
    var keyboard = getMenuKeyboard(keyboardNumber);
  
    if (keyboardNumber == 1) {
      updateText(userID, message_id, getInteractiveMenu()[0], {inline_keyboard: keyboard});
    } else if (keyboardNumber == 2) {
      updateText(userID, message_id, getInteractiveMenu()[1], {inline_keyboard: keyboard});
    } else {    
      updateText(userID, message_id, getInteractiveMenu()[2], {inline_keyboard: keyboard});
    }
  }
  
  function getMenuKeyboard(keyboardNumber) {
    var firstKeyboard = [
            [
              {
                text: 'Cancel/Complete',
                callback_data: 'toggleMenu-' + 2,
              },
              {
                text: "Subscribe/Support",
                callback_data: 'toggleMenu-' + 3,
              },
            ],
          ]
    var secondKeyboard = [
            [
              {
                text: 'Main',
                callback_data: 'toggleMenu-' + 1,
              },
              {
                text: "Subscribe/Support",
                callback_data: 'toggleMenu-' + 3,
              },
            ],
    ]
    var thirdKeyboard = [
            [
              {
                text: 'Main',
                callback_data: 'toggleMenu-' + 1,
              },
              {
                text: 'Cancel/Complete',
                callback_data: 'toggleMenu-' + 2,
              },
            ],
    ]
    if (keyboardNumber == 1) {
      return firstKeyboard;
    } else {
      if (keyboardNumber == 2) {
        return secondKeyboard;
      } else {
        return thirdKeyboard;
      }
    }
  }