const express = require("express");

const router = express.Router();

const path = require("path");

const adminController = require("../controllers/admin");

router.get("/add-product", adminController.addProducts);

router.post("/product", adminController.postAddProducts);

router.get("/products", adminController.getProducts);

module.exports = router;
