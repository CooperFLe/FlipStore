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

getOpenTransactions();
function getConnection() {
  return con;
}

function getOpenTransactions() {
  con.query("SELECT * FROM hacktober.invoices WHERE approved=0", (err, rows) => {
    if(err) return err.stack;

    rows.forEach( (row) => {
      console.log(`${row.event} cost $${row.amount}.`);
      con.query(`SELECT * from hacktober.users WHERE personID=${row.personID}`, (err,users) => {
        users.forEach((user) => {
          console.log(`${user.name} has a balance of $${user.balance}.`);
        });
      });
    });
  });

}