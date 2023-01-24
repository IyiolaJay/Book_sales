const express = require("express");
const router = express.Router();
const path = require("path");
const adminController = require("../controllers/admin");
const isAuth = require('../middlewares/isAuth');


router.get("/add-product", isAuth, adminController.addProducts);

router.get("/edit-product/:productId",isAuth, adminController.getEditProduct);

router.post("/edit-product", isAuth,adminController.postEditProduct);

router.post("/product",isAuth, adminController.postAddProducts);

router.get("/products",isAuth, adminController.getProducts);

router.post("/delete-product",isAuth, adminController.postDeleteProduct);

module.exports = router;
