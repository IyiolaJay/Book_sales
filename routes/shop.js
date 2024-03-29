const path = require("path");
const rootDir = require("../util/path");
const express = require("express");
const router = express.Router();
const shopControllers = require("../controllers/shop");
const isAuth = require('../middlewares/isAuth');
//Sending static HTML files
// router.get("/", (req, res, next) => {
//   res.sendFile(path.join(rootDir, "views", "shop.html"));
// });

//Using dynamic template engine
router.get("/", shopControllers.getIndex);

router.get("/products", shopControllers.getAllProducts);

router.get("/product/:productId", shopControllers.getProductDetail);

router.get("/cart", isAuth, shopControllers.getCart);

router.post("/cart", isAuth,shopControllers.postCart);

router.post("/cart/delete-item/:prodId",isAuth, shopControllers.postDeleteCart);

router.get("/checkout", isAuth, shopControllers.getCheckout);

router.get("/checkout/success", isAuth, shopControllers.getCheckoutSuccess);

router.get("/checkout/cancel", isAuth, shopControllers.getCheckout);

router.post("/create-order",isAuth, shopControllers.postOrder);

router.get("/orders",isAuth, shopControllers.getOrders);

router.get('/order/:orderId', isAuth, shopControllers.getOrderInvoice);

module.exports = router;
