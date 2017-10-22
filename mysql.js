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

function getConnection() {
  return con;
}