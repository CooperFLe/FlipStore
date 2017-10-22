const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysqlpass"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var users;

con.query("SELECT * FROM hacktober.users", (err, rows) => {
  users = rows;
})

getOpenTransactions();
function getConnection() {
  return con;
}

function getOpenTransactions() {
  con.query("SELECT * FROM hacktober.invoices WHERE approved=0", (err, rows) => {
    if(err) return err.stack;

    rows.forEach( (row) => {
      console.log(`${row.event} cost $${row.amount}.`);
      console.log(users[row.personID-1].name + " has a balance of " + users[row.personID-1].balance);
    });
  });

}