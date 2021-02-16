function chooseCategory(userID) {
    var category_keyboard = {
        inline_keyboard: [
          [
            {
              text: 'Dabao',
              callback_data: 'category-Dabao',
            },
          ],
          [
            {
              text: 'Collect Laundry',
              callback_data: 'category-Collect_Laundry',
            },
          ],
          [
            {
              text: 'Borrow Item',
              callback_data: 'category-Borrow_Item',
            },
          ],
          [
            {
              text: 'Open Gate',
              callback_data: 'category-Open_Gate',
            },
          ],
          [
            {
              text: 'Distract Barbara',
              callback_data: 'category-Distract_Barbara',
            },
          ],
          [
            {
              text: 'Miscellaneous',
              callback_data: 'category-Miscellaneous',
            },
          ],
        ],
    };

    sendText(userID, 'What Category?', category_keyboard);
}

function giveCredit(userID, data) {
    var data_arr = data.split("-");
    var category = data_arr[1];            
    var user = userInfo(userID);
    var credits = user.total_credits;
    
    var keyboard = [];
    for (i = 1; i <= credits && i <= 3; i++) {
          keyboard[i - 1] = [
              {
                text: i,
                callback_data: 'credit-' + category + ' ' + i,
              },
          ];
    }
    sendText(userID, 'How many credits?', {inline_keyboard: keyboard});
}

function addRemark(userID, data) {
    var data_arr = data.split("-");
    var category_number = data_arr[1];
    var remark_keyboard = {
        inline_keyboard: [
              [
              {
                  text: 'Yes',
                  callback_data: 'remark-' + category_number + ' 1',
              },
              ],
              [
              {
                  text: 'No',
                  callback_data: 'remark-' + category_number + ' 0',
              },
              ],
            ],
        };           
    
    sendText(userID, 'Do you want to add any remarks?', remark_keyboard);
}
                
function makeRequest(userID, data, remark) {
    var user = userInfo(userID);
    var total_credits = user.total_credits;
    var new_ref = requestLastRow();
    var listOfSubs = subscribedUsers();

    var data_arr = data.split('-');
    var category_number_remark = data_arr[1];
    var request = category_number_remark.split(' ')[0];
    var deducted_credit = category_number_remark.split(' ')[1];

    var new_credits = parseInt(total_credits) - parseInt(deducted_credit);
    var now = currentDateTime();

    newRequest(new_ref, request, deducted_credit, userID, "Available", now[0], now[1], "-", deducted_credit);
    setUserCredits(userID, new_credits);  

    if (remark === 0) {
      sendText(userID, 'Request made: ' + request + ' \n' + deducted_credit + ' credit(s)' +'\nRef number: ' + new_ref);
      for (i = 0; i < listOfSubs.length; i++) {        
        if (listOfSubs[i] !== userID) {
            var user = userInfo(userID);
            sendText(listOfSubs[i], 'Request made by ' + user.name + ': ' + request + ' \n' + deducted_credit + ' credit(s)' +'\nRef number: ' + new_ref);
        }
      }
    }
}
