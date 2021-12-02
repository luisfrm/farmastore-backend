const express = require('express');
const router = express.Router();
const dbConnection = require("../../config/connection");

const connection = dbConnection()

router.get('/', (req, res, next) => {
  res.send({text: "Get list of products"})
})

router.post('/', (req, res) => {
  res.send({text: "Client created"})
})

router.get('/:id', (req, res) => {
  res.send({text: "Product got"})
})

router.delete('/:id', (req, res) => {
  res.send({text: "Product removed"})
})

router.put('/:id', (req, res) => {
  res.send({text: "Product updated"})
})

connection.end()

module.exports = router