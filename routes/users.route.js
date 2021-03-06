const express = require("express");
const router = express.Router();

const Users = require("../controllers/users.controller");

//CREATE
router.post("/users", Users.create);

//GET
router.get("/users", Users.findAll);
router.get("/users/:id", Users.findOne);

//Update
router.put("/users/:id", Users.update);

//Delete 
router.delete("/users/:id", Users.delete);
router.delete("/users", Users.deleteAll);

module.exports = router;