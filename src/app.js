const express = require('express')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== "production") require('dotenv').config()

const PORT = process.env.PORT || 3050;

const app = express();
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({text: "Welcome to my API"})
})

const productRoutes = require("./api-v1/routes/products")
const userRoutes = require("./api-v1/routes/users")

app.use("/products", productRoutes)
app.use("/users", userRoutes)

// const errorHandler = (err, req, res, next) => {
//  console.log(err.message)
//  res.status(500).send("Something wrong " + err.message)
// }

// app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))