const express = require("express");
const router = express.Router();

const Basket = require("../controllers/basket.controller");

//CREATE
router.post("/basket", Basket.create);

//GET
router.get("/basket", Basket.findAll);
router.get("/basket/:id", Basket.findOne);

//Update
router.put("/basket/:id", Basket.update);

//Delete 
router.delete("/basket/:id", Basket.delete);
router.delete("/basket", Basket.deleteAll);

module.exports = router;