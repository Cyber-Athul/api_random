const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'iSubmitDB',
});

module.exports = pool.promise();