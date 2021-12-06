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



router.get('/', (req, res) => {
  const sql = "SELECT * FROM producto";

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err.message)
      res.status(500).json(err.message)
    }
    else {
      if(result.length>0) {
        res.status(200).json(result)
      } else {
        res.status(200).json([])
      }
    }
  })
})

router.get('/list/:amount', (req, res) => {
  const { amount } = req.params;
  
  const sql = `SELECT * FROM producto ORDER BY vistas DESC LIMIT ${amount}`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err.message)
      res.status(500).json(err.message)
    }
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
  const sql = `SELECT producto.id, producto.titulo, producto.marca, producto.precio, producto.stock, producto.vistas, producto.imagen, producto.idCategoria, categoria.nombre AS 'categoria' FROM producto INNER JOIN categoria ON idCategoria = categoria.id WHERE producto.id=${id}`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err.message)
      res.status(400).json(err)
    }else {
      if (result.length>0) {
        res.json(result)
      } else {
        res.status(200).send([])
      }
    }
  })
})


router.post('/updateViews/:id', (req, res) => {
  const { id } = req.params;
  const sqlGet = `SELECT vistas FROM producto WHERE id=${id}`;
  

  connection.query(sqlGet, (err, result) => {
    if (err) {
      console.log(err.message)
      res.status(400).json(err)
    } else {
      
      const vistas = result[0].vistas+1;
      const sql = `UPDATE producto SET vistas=${vistas} WHERE id=${id}`;
      connection.query(sql, (err, result2) => {
        if (err) {
          console.log(err.message)
          res.status(400).json(err)
        } else {
          res.status(200).json()
        }
      })
      res.status(200).json({message: "Producto was updated"})
    }
  })
})

router.post('/', async(req, res) => {
  const {precio, titulo, marca, stock, imagen, idCategoria } = req.body;
  const sql = `INSERT INTO producto(precio, titulo, marca, stock, imagen, idCategoria) VALUES(${precio}, '${titulo}', '${marca}', ${stock}, '${imagen}', ${idCategoria})`;

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
  const { titulo, precio, marca, stock, imagen, idCategoria } = req.body;
  const sql = `UPDATE producto SET titulo='${titulo}', precio=${precio}, marca='${marca}', stock=${stock}, imagen='${imagen}', idCategoria=${idCategoria} WHERE id=${id}`;

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