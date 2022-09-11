const path = require("path");

const rootDir = require("../util/path");

const express = require("express");

const router = express.Router();

const shopControllers = require("../controllers/shop");

//Sending static HTML files
// router.get("/", (req, res, next) => {
//   res.sendFile(path.join(rootDir, "views", "shop.html"));
// });

//Using dynamic template engine
router.get("/", shopControllers.getIndex);

router.get("/products", shopControllers.getAllProducts);

router.get("/product/:productId", shopControllers.getProductDetail);

router.get("/cart", shopControllers.getCart);

router.get("/checkout", shopControllers.getCheckout);

router.get("/orders", shopControllers.getOrders);

module.exports = router;
