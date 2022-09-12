const Product = require("../models/product");

// const product = [];

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "All Product",
      path: "/products",
    });
  });
  // console.log(products);
};

exports.getProductDetail = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id, (product) => {
    // console.log(product);
    res.render("shop/product-detail", {
      docTitle: product.title,
      path: "/products",
      product: product,
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      docTitle: "Shop Wick",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", { docTitle: "Cart", path: "/cart" });
};

exports.postCart = (req, res, next) => {
  const prodId = req.params.productHiddenId;
  res.redirect("/cart");
};
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { docTitle: "Your Order", path: "/orders" });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { docTitle: "Checkout", path: "/checkout" });
};
