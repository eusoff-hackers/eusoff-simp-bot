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
            text: 'Borrow Item',
            callback_data: 'category-Borrow_Item',
          },
        ],
        [
          {
            text: 'Print Documents',
            callback_data: 'category-Print',
          },
        ],
        [
          {
            text: 'Collect Parcel',
            callback_data: 'category-Collect_Parcel',
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
  sendText(userID, 'How many credits? You currently have ' + credits + ' credit(s).', {inline_keyboard: keyboard});
}

function broadcast(userId, remark) {    
sendText(1165718697, "broadcast called");
var req = getLastUserRequest(userId);
var listOfSubs = subscribedUsers();  
var user = userInfo(userId);

var str = req.ref + ". " + req.request + " - " + req.credits + " credit(s)\nmade by " + user.name + " at " + req.time.slice(0, -2) + ", " + req.date.slice(0, -2) + "\nRemark: " + remark + "\n\n";

// setRequestString(req.ref, str); Deprecated column
setRequestRemark(req.ref, remark);  
setUserOngoing(userId, "0");  

if (req === false) {
  sendText(userId, "Invalid!");
} 

sendText(userId, 'You have made a new request!'.bold() + '\nRequest made: ' + req.request + ' \n' + req.credits + ' credit(s)\nRef number: ' + req.ref + '\nRemark: ' + remark);
//   sendMenu(userId);

var submsg = '💦  New Request 💦'.bold() + '\nRequest made by ' + user.name + ' (' + user.room + ') : ' + req.request + ' \n' + req.credits + ' credit(s)' +'\nRef number: ' + req.ref + '\nRemark: ' + remark;

var ref = parseInt(req.ref) - 1;

var keyboard = [
        [
          {
            text: 'Take Request',
            callback_data: 'take_request-' + ref,
          },
          // {
          //   text: 'Simp',
          //   callback_data: 'simp-' + ref + " o",
          // },
        ],
      ]

// sendText(1165718697, submsg, {inline_keyboard: keyboard});
for (i = 0; i < listOfSubs.length; i++) { 
  if (listOfSubs[i] !== userId) {
    try {
      sendText(parseInt(listOfSubs[i]), submsg, {inline_keyboard: keyboard});
      
      // sendText(1165718697, "sent notif" + listOfSubs[i]);
      // sendText(885582521, "sent notif" + listOfSubs[i]);
    } catch (e) {
      // console.log(e);
      // sendText(1165718697, "sub block" + listOfSubs[i]);
      // sendText(885582521, "sub block" + listOfSubs[i]);
      continue;
    }
  }
}
}

var c = 0;

function test() {
var listOfSubs = subscribedUsers(); 
for (i = 0; i < listOfSubs.length; i++) { 
  if (listOfSubs[i] !== 2) {
    console.log(c);
    c = c +1;
    try {
      sendText(1, "hi");
      
      // sendText(1165718697, "sent notif" + listOfSubs[i]);
      // sendText(885582521, "sent notif" + listOfSubs[i]);
    } catch (e) {
      // console.log(e);
      // sendText(1165718697, "sub block" + listOfSubs[i]);
      // sendText(885582521, "sub block" + listOfSubs[i]);
      continue;
    }
  }
}
}
               
function makeRequest(userID, data) {
  var user = userInfo(userID);
  var total_credits = user.total_credits;
  var new_ref = requestLastRow();
  var data_arr = data.split('-');
  var category_number_remark = data_arr[1];
  var request = category_number_remark.split(' ')[0];
  var deducted_credit = category_number_remark.split(' ')[1];
  var new_credits = parseInt(total_credits) - parseInt(deducted_credit);
  var now = getDateTime();
  newRequest(new_ref, request, deducted_credit, userID, "Available", now.date + 'Ew', now.time + 'Ew', "-", 0, "", "");
  setUserCredits(userID, new_credits);
}
