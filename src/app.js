const express = require('express')
const bodyParser = require('body-parser')

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

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))