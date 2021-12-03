const express = require('express');
const router = express.Router();
const dbConnection = require("../../config/connection");
const {updateDate, getLastId} = require('../../helpers/helpers')

const lastId = async(table) => {
  let id;
  await getLastId(table).then(x => {
    id=x;
  });
  return id;
}

const connection = dbConnection() 

connection.connect (err => {
   if (err) {
    console.error('error connecting:');
    return;
  };
  console.log("Database server running")
})

router.get('/', (req, res) => {
  const sql = "SELECT * FROM producto";

  connection.query(sql, (err, result) => {
    if (err) console.error
    else {
      if(result.length>0) {
        res.json(result)
      } else {
        res.send("Not results")
      }
    }
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM producto WHERE id=${id}`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err.message)
      res.status(400).json(err)
    }else {
      if (result.length>0) {
        res.json(result)
      } else {
        res.status(404).send({message: "Not result"})
      }
    }
  })
})

router.post('/', async(req, res) => {
  const {descrip, pass, stock, vistas, imagen, idCategoria, expired} = req.body;
  const sql = `INSERT INTO producto(descrip, pass, stock, vistas, imagen, idCategoria, expired) VALUES('${descrip}', '${pass}', '${stock}', '${vistas}', '${imagen}', '${idCategoria}', '${expired}')`;

  connection.query(sql, err => {
    if (err) {
      console.log(err.message)
      res.status(400).json(err)
    } else {
      let id;
      lastId('producto').then(x => {
        id=x
        if (id!=='400') updateDate(id, 'producto')
      })
      
      res.status(200).json({message: "Producto was created"})
    }
  })
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {descrip, pass, stock, vistas, imagen, idCategoria, expired} = req.body;
  const sql = `UPDATE producto SET descrip='${descrip}', pass='${pass}', stock='${stock}', vistas='${vistas}', imagen='${imagen}', idCategoria='${idCategoria}', expired='${expired} WHERE id=${id}`;

  connection.query(sql, err => {
    if (err) {
      console.log(err.message)
      res.status(400).json(err)
    } else {
      res.status(200).json({message: "Product was modified"})
    }
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM producto WHERE id=${id}`;

  connection.query(sql, err => {
    if (err) {
      console.log(err.message)
      res.status(400).json(err)
    } else {
      res.status(200).json({message: "Producto was removed"})
    }
  })
})


module.exports = router;