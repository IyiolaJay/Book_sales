const express = require("express");

const router = express.Router();

const path = require("path");

const productsController = require("../controllers/products");

router.get("/add-product", productsController.addProducts);

router.post("/product", productsController.postAddProducts);

module.exports = router;
