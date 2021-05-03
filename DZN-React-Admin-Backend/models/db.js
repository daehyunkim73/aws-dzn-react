const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

// const db_info = {
//   host: "127.0.0.1",
//   port: "3306",
//   user: "root",
//   password: "apmsetup",
//   database: process.env.DB_NAME,
//   multipleStatements: true,
// };
const db_info = {
  host: "10.70.170.135",
  port: "3306",
  user: "dinnoplus",
  password: "dinno123!@#",
  database: process.env.DB_NAME,
  multipleStatements: true,
  dateStrings: "date",
};

module.exports = {
  init: () => {
    return mysql.createConnection(db_info);
  },
  connect: (conn) => {
    conn.connect((err) => {
      if (err) {
        console.error("mysql connection error:", err);
      } else {
        console.log("mysql is connected successfully");
      }
    });
  },
};
