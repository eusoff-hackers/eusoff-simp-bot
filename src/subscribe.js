function subscribedUsers() {
    var rangeValues = userRange();  
    var res = [];  
    for (i = 0; i < usersLastRow(); i++) {
      if (rangeValues[i][5] === 'Yes') {
            res.push(parseInt(rangeValues[i][0]));
        }
    }
    return res;  
}
