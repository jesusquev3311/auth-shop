const express = require("express");
const router = express.Router();

const Auth = require("../controllers/auth.controller");

//REGISTER
router.post("/register", Auth.register);

//LOGIN
router.post("/login", Auth.login);

module.exports = router;