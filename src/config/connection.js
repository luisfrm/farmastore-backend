const mysql = require('mysql');

// MySql

const dbConfig = {
  connectionLimit : 100,
  host: `${process.env.dbHOST}`,
  user: `${process.env.dbUSER}`,
  password: `${process.env.dbPASS}`,
  database: `${process.env.dbDATABASE}`
}

module.exports = () => {
  var connection = mysql.createPool(dbConfig);

  return connection
}