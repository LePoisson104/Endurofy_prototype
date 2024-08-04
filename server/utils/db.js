const mysql = require("mysql");

require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.HOST_NAME,
  database: process.env.DATABASE_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
});

pool.getConnection((err) => {
  if (err) {
    console.error("Could not connect to DB");
  }
  console.log("Database connected sucessfully!");
});

module.exports = pool;
