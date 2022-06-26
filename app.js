const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const app = express();
const db = require("./models/index");
const productsRoutes = require("./routes/products.route");
const usersRoutes = require("./routes/users.route");
const basketRoutes = require("./routes/basket.route");

// Database Sync
db.connection.sync()
.then(resp => console.log("DB conected ", resp))
.catch(err => console.error(err));


// setting CORS
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
};

app.use(cors(corsOptions));


// Parsing requests
app.use(bodyParser.urlencoded({extended: false}));

//Routes middlewares
app.use(usersRoutes);
app.use(productsRoutes);
app.use(basketRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the application server." });
});

// Sending Not Found requests to 404 view
app.use((req, res, next)=>{
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
})


module.exports = app;