const express = require('express');
const router = express.Router();
const dbConnection = require("../../config/connection");

const connection = dbConnection();

router.get('/', (req, res) => {
  const sql = "SELECT * FROM categoria";

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      if(result.length>0) {
        res.json(result)
      } else {
        res.status(200).json([])
      }
    }
  })
})

router.get('/test/:id', (req, res) => {
  const { id } = req.params;
  console.log(id)
  res.status(200).send('ok')
})


router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM categoria WHERE id=${id}`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err.message)
      res.status(400).json(err)
    }else {
      if (result.length>0) {
        res.status(200).json(result)
      } else {
        res.status(200).json([])
      }
    }
  })
})

router.post('/', async(req, res) => {
  const {nombre} = req.body;
  const sql = `INSERT INTO categoria(nombre) VALUES('${nombre}')`;

  connection.query(sql, err => {
    if (err) {
      console.log(err.message)
      res.status(400).json(err)
    } else {
      res.status(200).json({message: "Categoria was created"})
    }
  })
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {nombre} = req.body;
  const sql = `UPDATE categoria SET nombre='${nombre}' WHERE id=${id}`;

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
  const sql = `DELETE FROM categoria WHERE id=${id}`;

  connection.query(sql, err => {
    if (err) {
      console.log(err.message)
      res.status(400).json(err)
    } else {
      res.status(200).json({message: "categoria was removed"})
    }
  })
})


module.exports = router;