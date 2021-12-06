 const dbConnection = require('../config/connection');

  const connection = dbConnection()
  
 exports.getLastId = (table) => {
   return new Promise((resolve, reject) => {
     const sql = `SELECT id FROM ${table} ORDER BY id DESC LIMIT 1`;
     connection.query(sql, (err, result) => {
       if (err) {
         resolve("400")
       }else {
         resolve(result[0].id)
       }
     })
   });
 }

 exports.updateDate = (id, table) => {
   const sql = `UPDATE ${table} SET fecha=NOW() where id=${id}`;

   connection.query(sql, (err, result) => {
     if (!err) {
     } else {
       console.log(err.message)
     }
   })

 }