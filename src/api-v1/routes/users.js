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
  const sql = "SELECT * FROM usuario";

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
  const sql = `SELECT * FROM usuario WHERE id=${id}`;
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
  const {user, pass, nombre, apellido, cedula, telefono, direccion, correo} = req.body;
  const sql = `INSERT INTO usuario(user, pass, nombre, apellido, cedula, telefono, direccion, correo) VALUES('${user}', '${pass}', '${nombre}', '${apellido}', '${cedula}', '${telefono}', '${direccion}', '${correo}')`;

  connection.query(sql, err => {
    if (err) {
      console.log(err.message)
      res.status(400).json(err)
    } else {
      let id;
      lastId('usuario').then(x => {
        id=x
        if (id!=='400') updateDate(id, 'usuario')
      })
      
      res.status(200).json({message: "User was created"})
    }
  })
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {user, pass, nombre, apellido, cedula, telefono, direccion, correo} = req.body;
  const sql = `UPDATE usuario SET user='${user}', pass='${pass}', nombre='${nombre}', apellido='${apellido}', cedula='${cedula}', telefono='${telefono}', direccion='${direccion}', correo='${correo}' WHERE id=${id}`;

  connection.query(sql, err => {
    if (err) {
      console.log(err.message)
      res.status(400).json(err)
    } else {
      res.status(200).json({message: "User was modified"})
    }
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM usuario WHERE id=${id}`;

  connection.query(sql, err => {
    if (err) {
      console.log(err.message)
      res.status(400).json(err)
    } else {
      res.status(200).json({message: "User was removed"})
    }
  })
})

module.exports = router;