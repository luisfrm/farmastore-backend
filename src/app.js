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
const categoryRoutes = require("./api-v1/routes/category")

app.use("/products", productRoutes)
app.use("/users", userRoutes)
app.use("/category", categoryRoutes)

const errorHandler = (err, req, res, next) => {
console.log(err.message)
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))