const mysql = require('mysql2');

const password = process.env.MYSQL_PASSWORD;

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'fullstack-node-shop',
  password,
});

module.exports = pool.promise();
