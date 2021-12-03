const mysql = require('mysql');

// MySql
module.exports = () => {
 return mysql.createConnection({
    host: `${process.env.dbHOST}`,
    user: `${process.env.dbUSER}`,
    password: `${process.env.dbPASS}`,
    database: `${process.env.dbDATABASE}`
  });
}