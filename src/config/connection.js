const mysql = require('mysql');

// MySql
module.exports = () => {
 return mysql.createConnection({
    host: 'remotemysql.com',
    user: 'zi93L9utcf',
    password: '3NlcjVJus1',
    database: 'zi93L9utcf'
  });
}