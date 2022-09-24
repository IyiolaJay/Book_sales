const express = require("express");

const router = express.Router();

const path = require("path");

const adminController = require("../controllers/admin");

router.get("/add-product", adminController.addProducts);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/product", adminController.postAddProducts);

router.get("/products", adminController.getProducts);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
