const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// setting CORS
const corsOptions = {
    origin: "localhost:8001",
};

app.use(cors(corsOptions));

// Parsing requests
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the application." });
});

// Sending Not Found requests to 404 view
app.use((req, res, next)=>{
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
})


module.exports = app;