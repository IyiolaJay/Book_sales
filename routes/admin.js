const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const path = require("path");

const product = [];
router.get("/add-product", (req, res, next) => {
  //   console.log("In another middleware");
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/product", (req, res, next) => {
  console.log(req.body.title);
  product.push({ title: req.body.title });
  res.redirect("/admin/add-product");
});
module.exports = router;
module.exports.product = product;
