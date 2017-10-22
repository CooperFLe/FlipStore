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
});
con.query("SELECT * FROM hacktober.invoices WHERE approved=0", (err, rows) => {
   if(err) return err.stack;
    rows.forEach( (row) => {
      const personID = row.personID;
      var html = "";
      html = html + `<button onclick="accordion('drop${row.invoiceID}')" class="w3-btn w3-block w3-white w3-left-align">`
      html = html + "<li>";
      html = html + '<img class="avatar" src="' + users[personID].avatar + '" alt="logo" style="height:10%" align="left">';
      html = html + '<h4 class="text">' + users[personID].name + '</h4>';
      html = html + '<p class="text">' + row.timestamp + '</p> ';
      html = html + '<div id="drop' + row.invoiceID + '" class="w3-container w3-hide text">';
      html = html + '<h4 class="text">Event: ' + row.event + '</h4>';
      html = html + `<h5 class="text">Receipt: <a href=${row.image} target="_blank">Image</a>`;
      html = html + `<h5 class="text">Amount: $${row.amount}</h5>`;
      html = html + `<h5 class="text">Notes: ${row.notes}</h5>`;
      html = html + "</li>";
      transactions = transactions + html;
      if(document.getElementById("transactions"))
        document.getElementById("transactions").innerHTML = document.getElementById("transactions").innerHTML + html;
      document.getElementById("bal").innerHTML = "Org Balance: $" + users[0].balance;
    });
});

function getUsers(){
  return users;
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