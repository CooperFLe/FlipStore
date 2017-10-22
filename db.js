const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysqlpass"
});

var users;
var transactions;
con.query("SELECT * FROM hacktober.users", (err, rows) => {
  users = rows;
  document.getElementById("bal").innerHTML = "Org Balance: $" + users[0].balance.toFixed(2);
});
con.query("SELECT * FROM hacktober.invoices WHERE approved=0", (err, rows) => {
   if(err) return err.stack;
    rows.forEach( (row) => {
      const personID = row.personID;
      var html = "";
      html = html + `<button onclick="accordion('drop${row.invoiceID}')" class="w3-button w3-block w3-white w3-left-align">`
      html = html + "<li>";
      html = html + '<img class="avatar" src="' + users[personID].avatar + '" alt="logo" style="height:10%" align="left">';
      html = html + '<h4 class="text">' + users[personID].name + '</h4>';
      if(row.approved){
          html = html + '<p class="text">Completed</p>';
      }
      else{
          html = html + '<p class="text w3-text-red">Pending</p>';
      }
      html = html + '<p class="text w3-right-align">' + row.timestamp + '</p> ';
      html = html + '<div id="drop' + row.invoiceID + '" class="w3-container w3-hide text">';
      html = html + '<h4 class="text">Event: ' + row.event + '</h4>';
      html = html + `<h5 class="text">Receipt: <a href=${row.image} target="_blank">Image</a>`;
      html = html + `<h5 class="text">Amount: $${row.amount.toFixed(2)}</h5>`;
      html = html + `<h5 class="text">Notes: ${row.notes}</h5>`;
      if(!row.approved){
        html = html + `<a onclick="acceptTransaction(${row.invoiceID})" href="index.html" class="w3-btn w3-green">Accept</a>`;
      }
      html = html + "</div></li>";
      transactions = transactions + html;
      if(document.getElementById("transactions"))
        document.getElementById("transactions").innerHTML = document.getElementById("transactions").innerHTML + html;
    });
});

function getUsers(){
  return users;
}
  
function acceptTransaction(id){
    con.query(`SELECT personID, amount FROM hacktober.invoices WHERE invoiceID=${id}`, (err,rows) => {
      dif = rows[0].amount;
      userID = rows[0].personID + 1;
      con.query(`SELECT balance FROM hacktober.users WHERE personID=${userID}`, (err,rows) => {
        accountBal = rows[0].balance + dif;
        con.query(`UPDATE hacktober.users SET balance=${accountBal} WHERE personID=${userID}`, null);
      });
      con.query('SELECT balance FROM hacktober.users WHERE personID=1', (err,rows) => {
        orgBal = rows[0].balance - dif;
        con.query(`UPDATE hacktober.users SET balance=${orgBal} WHERE personID=1`, null);
      });
      con.query(`UPDATE hacktober.invoices SET approved=1, paid=1 WHERE invoiceID=${id}`, null);
    });
}
/*
<li>
      <img class="avatar" src="https://pbs.twimg.com/profile_images/883032684284452864/pFLc_D2c_400x400.jpg" alt="logo" style="height:10%" align="left"> 
      <h4 class="text">Jason Waye</h4>
      <p id="time" class="text">15m ago</p>
      <div id="drop4" class="w3-container w3-hide">
        <p>Pending Requests: 5</p>
        <p><u><font color = blue>Transaction History</font></u></p>
        <p>Send Message</p>
    </div>
</li>
*/