const express = require("express");
const router = express.Router();

const Products = require("../controllers/products.controller");
//GET
router.get("/products", Products.findAll);
router.get("/products/:id", Products.findOne);

//Update
router.put("/products/:id", Products.update);

//Delete 
router.delete("/products/:id", Products.delete);
router.delete("/products", Products.deleteAll);

exports.routes = router;