const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const path = require("path");

const product = [];
router.get("/add-product", (req, res, next) => {
  //   console.log("In another middleware");
  res.render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    productActive: true,
    formCss: true,
    productCss: true,
  });
});

router.post("/product", (req, res, next) => {
  console.log(req.body.title);
  product.push({ title: req.body.title });
  res.redirect("/admin/add-product");
});
module.exports = router;
module.exports.product = product;
