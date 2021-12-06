 const dbConnection = require('../config/connection');
 exports.getLastId = (table) => {
   return new Promise((resolve, reject) => {
     const connection = dbConnection()
     connection.connect (err => {
        if (err) {
         console.error('error connecting:', err.message);
         return;
       };
     })
     const sql = `SELECT id FROM ${table} ORDER BY id DESC LIMIT 1`;
     connection.query(sql, (err, result) => {
       if (err) {
         resolve("400")
       }else {
         resolve(result[0].id)
       }
     })
     connection.release();
   });
 }

 exports.updateDate = (id, table) => {
   const connection = dbConnection()
   connection.connect (err => {
      if (err) {
       console.error('error connecting:', err.message);
       return;
     };
   })

   const sql = `UPDATE ${table} SET fecha=NOW() where id=${id}`;

   connection.query(sql, (err, result) => {
     if (!err) {
     } else {
       console.log(err.message)
     }
   })

   connection.release();
 }