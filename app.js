const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "localhost:8001",
};

app.use(cors(corsOptions));

module.exports = app;