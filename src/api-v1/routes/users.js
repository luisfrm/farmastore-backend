const express = require('express');
const router = express.Router();
const dbConnection = require("../../config/connection");

const connection = dbConnection() 

connection.connect (err => {
  if (err) console.error;
  console.log("Database server running")
})

router.get('/', (req, res) => {
  const sql = "SELECT * FROM usuario";

  connection.query(sql, (err, result) => {
    if (err) console.error
    if(result.length>0) {
      res.json(result)
    } else {
      res.send("Not results")
    }
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM usuario WHERE id=${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err
    if (result.length>0) res.json(result)
    else res.send({message: "Not result"})
  })
})

router.post('/', (req, res) => {
  const sql = "INSERT INTO usuario SET ?";

  const {user, pass, fecha, nombre, apellido, cedula, telefono, direccion, correo} = req.body

  const usuarioData = {
    nombre,
    apellido,
    user,
    pass,
    cedula,
    telefono,
    direccion,
    correo,
    fecha
  }

  connection.query(sql, usuarioData, err => {
    if (err) throw err;
    res.send("Customer created")
  })
})

router.put('/:id', (req, res) => {
  res.send("Update customer")
})

router.delete('/:id', (req, res) => {
  res.send("Delete customer")
})

module.exports = router;