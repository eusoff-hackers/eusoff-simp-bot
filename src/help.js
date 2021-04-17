function sendTutorial(userId) {
  var count = 0;
  var next = count + 1;
  var firstkeyboard = [
          [
            {
              text: 'Next',
              callback_data: 'toggleTut-' + next,
            },
          ],
          [
            {
              text: 'I know this already. Take me to the bot.',
              callback_data: 'back-',
            },
          ],
  ]
  sendText(userId, getTutorialText(count), { inline_keyboard: firstkeyboard });
}

function updateTutorial(userId, data, message_id) {
  var data_arr = data.split('-');
  var count = parseInt(data_arr[1]);

  var next = count + 1;
  var previous = count - 1;
  var firstkeyboard = [
          [
            {
              text: 'Next',
              callback_data: 'toggleTut-' + next,
            },
          ],
          [
            {
              text: 'I know this already. Take me to the bot.',
              callback_data: 'back-',
            },
          ],
  ]
  var keyboard = [
          [
            {
              text: 'Previous',
              callback_data: 'toggleTut-' + previous,
            },
            {
              text: 'Next',
              callback_data: 'toggleTut-' + next,
            },
          ],
          [
            {
              text: 'I know this already. Take me to the bot.',
              callback_data: 'back-',
            },
          ],
        ]
  var finalkeyboard = [
          [
            {
              text: 'Previous',
              callback_data: 'toggleTut-' + previous,
            },
          ],
          [
            {
              text: 'I know this already. Take me to the bot.',
              callback_data: 'back-',
            },
          ],
    ]
  if (count == 0) {
    updateText(userId, message_id, getTutorialText(count), { inline_keyboard: firstkeyboard });
  } else {
    if (count == 5) {
      updateText(userId, message_id, getTutorialText(count), { inline_keyboard: finalkeyboard });
    } else {
      updateText(userId, message_id, getTutorialText(count), { inline_keyboard: keyboard });
    }
  }
}

function getTutorialText(page) {
  if (page == 0) {
    return "[What is this bot]\n\n".bold() + 
           "This bot is a platform for " +
           "Eusoffians to help each other out by taking or making requests."; 
  } else if (page == 1) {
    return "[Making a Request]\n\n".bold() + 
            "You are given 5 credits to begin with" + 
           "and you can use those credits to make requests. You can allocate more credits to your" + 
           "requests if it is of higher urgency or a higher difficulty.\n\n" +
           "To make a request, click /makeRequest and click the category that your " + 
           "request belongs to. Do remember to include a description so that it will" + 
           "be easier to understand.";
  } else if (page == 2) {
    return "[Viewing & Taking Active Requests]\n\n".bold() + 
           "Once you made your request," + 
           "you can view it in /view. You can also take or simp(doing a request without" + 
           "receiving any credits) any requests that are active in /view.";
  } else if (page == 3) {
    return "[Completing & Cancelling Requests]\n\n".bold() +
           "Once someone has completed your request, press /complete to release" + 
           "the credits to the Good Samaritan who helped you out.\n\n" + 
           "If you want to cancel your request, simply press /cancel and choose the respective request.";
  } else if (page == 4) {
    return "[Profile & Leaderboard]\n\n".bold() + 
           "If you have made multiple requests or have taken multiple requests" + 
           "and can't remember what you have, click /profile to view your profile. " + 
           "You may also view your account details and remaining credits there.\n\n" +
           "To incentivize Eusoffians to do favours for others, there is a leaderboard" + 
           "that can be accessed through /leaderboard. Prizes may be offered to Eusoffians " + 
           "who top the leaderboards.";
  } else {
    return "[Final Words]\n\n".bold() + 
           "Do remember to click /subscribe if you want to receive updates on the latest requests posted.\n\n" + 
           "If you are experiencing any technical difficulty, click /support to get help.";
  }
}
