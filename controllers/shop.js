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
  res.render("shop/product-detail", {
    docTitle: "Product",
    path: `/product/${req.params.productId}`,
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

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { docTitle: "Your Order", path: "/orders" });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { docTitle: "Checkout", path: "/checkout" });
};
