const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysqlpass"
});

var users;
//document.getElementById("transactions").innerHTML = "<b>I hate you</b>";
con.query("SELECT * FROM hacktober.users", (err, rows) => {
  users = rows;
});
con.query("SELECT * FROM hacktober.invoices WHERE approved=0", (err, rows) => {
   if(err) return err.stack;
    rows.forEach( (row) => {
      const personID = row.personID - 1;
      var html = "";
      html = html + "<li>";
      html = html + '<img class="avatar" src="' + users[personID].avatar + '" alt="logo" style="height:10%" align="left">';
      html = html + '<h4 class="text">' + users[personID].name + '</h4>';
      html = html + '<p class="text">' + row.timestamp + '</p> ';
      html = html + "</li>";
      console.log(html);
//      document.getElementById("transactions").innerHTML = document.getElementById("transactions").innerHTML + html;
    });
    con.end();
});
/*
<ul class="w3-ul">
                <li>
                     <img class="avatar" src="https://pbs.twimg.com/profile_images/883032684284452864/pFLc_D2c_400x400.jpg" alt="logo" style="height:10%" align="left"> 
                     <h4 class="text">Jason Waye</h4>
                     <p id="time" class="text">15m ago</p>
                </li>
                <li>
                     <img class="avatar" src="https://pbs.twimg.com/profile_images/883032684284452864/pFLc_D2c_400x400.jpg" alt="logo" style="height:10%" align="left"> 
                     <h4 class="text">Cooper Le</h4>
                     <p class="text">4h ago</p>
                </li>
                <li>
                     <img class="avatar" src="https://pbs.twimg.com/profile_images/883032684284452864/pFLc_D2c_400x400.jpg" alt="logo" style="height:10%" align="left"> 
                     <h4 class="text">Alyssa Tichenor</h4>
                     <p class="text">16h ago</p>
                </li>
                <li>
                     <img class="avatar" src="https://pbs.twimg.com/profile_images/883032684284452864/pFLc_D2c_400x400.jpg" alt="logo" style="height:10%" align="left"> 
                     <h4 class="text">Sabrina Banh</h4>
                     <p class="text">2d ago</p>
                </li>
                <li>
                     <img class="avatar" src="https://pbs.twimg.com/profile_images/883032684284452864/pFLc_D2c_400x400.jpg" alt="logo" style="height:10%" align="left"> 
                     <h4 class="text">Megan Chan</h4>
                     <p class="text">4d ago</p>
                </li>
            </ul> 
*/