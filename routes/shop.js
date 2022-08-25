const path = require("path");

const rootDir = require("../util/path");

const express = require("express");

const router = express.Router();

const adminData = require("./admin");

//Sending static HTML files
// router.get("/", (req, res, next) => {
//   res.sendFile(path.join(rootDir, "views", "shop.html"));
// });

//Using dynamic template engine
router.get("/", (req, res, next) => {
  const products = adminData.product;
  const data = {
    prods: products,
    docTitle: "Shop Wick",
    path : '/'
  };
  res.render("shop", data);
});

module.exports = router;
