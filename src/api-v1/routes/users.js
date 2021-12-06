const express = require('express');
const router = express.Router();
const dbConnection = require("../../config/connection");
const {updateDate, getLastId} = require('../../helpers/helpers')

const connection = dbConnection();

const lastId = async(table) => {
  let id;
  await getLastId(table).then(x => {
    id=x;
  });
  return id;
}

const createNivelUsuario = (idUsuario, idNivel) => {
  const sql = `INSERT INTO nivel_usuario(idUsuario, idNivel) values('${idUsuario}', ${idNivel})`;
  connection.query(sql, err => {
    if (err) {
      console.log(err.message)
      return 400
    } else {
      return 200;
    }
  })
}

router.get('/', (req, res) => {
  const sql = "SELECT * FROM usuario";

  connection.query(sql, (err, result) => {
    if (err) console.error
    else {
      if(result.length>0) {
        res.status(200).json(result)
      } else {
        res.status(200).json([])
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
        res.status(200).json(result)
      } else {
        res.status(200).json([])
      }
    }
  })
})

router.get('/login/:userData', (req, res) => {
  const { userData } = req.params;
  const [user, pass] = userData.split(';')

  const sql = `SELECT nivel_usuario.idUsuario FROM usuario INNER JOIN nivel_usuario ON usuario.id = nivel_usuario.idUsuario WHERE user='${user}' && pass='${pass}'`;
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
  const {user, pass, nombre, apellido, cedula, telefono, direccion, correo, idNivel} = req.body;
  const sql = `INSERT INTO usuario(user, pass, nombre, apellido, cedula, telefono, direccion, correo) VALUES('${user}', '${pass}', '${nombre}', '${apellido}', '${cedula}', '${telefono}', '${direccion}', '${correo}')`;

  connection.query(sql, err => {
    if (err) {
      console.log(err.message)
      res.status(400).json(err)
      return
    } else {
      let id;
      lastId('usuario').then(x => {
        id=x
        if (id!=='400') {
          updateDate(id, 'usuario')
          createNivelUsuario(id, idNivel)
        }
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