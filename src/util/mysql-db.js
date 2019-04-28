const mysql = require('mysql2');

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const database = process.env.MYSQL_DATABASE;
const password = process.env.MYSQL_PASSWORD;

const pool = mysql.createPool({
  host,
  user,
  database,
  password,
});

module.exports = pool.promise();
