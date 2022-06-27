const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const app = express();
const db = require("./models/index");
const session = require("express-session");

const productsRoutes = require("./routes/products.route");
const usersRoutes = require("./routes/users.route");
const basketRoutes = require("./routes/basket.route");
const authRoutes = require("./routes/auth.route");
const ProductsModel = db.products;
const Data = require("./utils/constants");

// Database Sync
db.connection.sync()
.then((resp) => {
    console.log("DB conected");

    ProductsModel.findOne({where: {name: "non-empty"}})
    .then(resp => {
        if(!resp){
            console.log("here")
            ProductsModel.bulkCreate(Data.DUMMY)
                .then(resp => console.log("success: ", resp))
                .catch(err => console.error(err));
        }
    })
    .catch(err => console.error(err));

    return resp;
})
.catch(err => console.error(err));

// Parsing requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// setting CORS
const corsOptions = {
    Credentials: false,
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(session({
    name: "session-id",
    secret: process.env.TOKEN_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: { 
        name: "logged",
        secure: false,
        maxAge: 6000000
    }
}));

//Auth
app.use("/api", authRoutes);

//user authentification
function auth(req, res, next) {
    if (!req.session.cookie.name === "logged") {
        return res.status(403).send({
            success: false,
            message: "You're not Authorized",
        });
    } else {
        next()
    }
}

//require Auth
app.use(auth);

//Routes middlewares
app.use("/api", usersRoutes);
app.use("/api", productsRoutes);
app.use("/api", basketRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the application server." });
});

// Sending Not Found requests to 404 view
app.use((req, res, next)=>{
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
})


module.exports = app;