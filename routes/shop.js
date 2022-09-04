const path = require("path");

const rootDir = require("../util/path");

const express = require("express");

const router = express.Router();

const productControllers = require("../controllers/products");

//Sending static HTML files
// router.get("/", (req, res, next) => {
//   res.sendFile(path.join(rootDir, "views", "shop.html"));
// });

//Using dynamic template engine
router.get("/", productControllers.getAllProducts);

module.exports = router;
