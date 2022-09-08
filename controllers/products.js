const Product = require("../models/product");

// const product = [];

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      docTitle: "Shop Wick",
      path: "/",
      hasProducts: products.length > 0,
      shopActive: true,
      productCss: true,
    });
  });
  // console.log(products);
};

exports.addProducts = (req, res, next) => {
  res.render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    productActive: true,
    formCss: true,
    productCss: true,
  });
};

exports.postAddProducts = (req, res, next) => {
  const product = new Product(req.body.title);
  // console.log(req.body.title);
  product.save();
  res.redirect("/admin/add-product");
};
