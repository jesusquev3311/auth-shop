const express = require("express");
const router = express.Router();

const Users = require("../controllers/users.controller");
//GET
router.get("/", Users.findAll);
router.get("/:id", Users.findOne);

//Update
router.put("/:id", Users.update);

//Delete 
router.delete("/:id", Users.delete);
router.delete("/", Users.deleteAll);

module.exports = router;