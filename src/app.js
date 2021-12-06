const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

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

// use it before all route definitions
app.use(cors());

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))