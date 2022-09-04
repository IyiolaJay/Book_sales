const adminData = require("../routes/admin");

exports.getAllProducts = (req, res, next) => {
  const products = adminData.product;
  const data = {
    prods: products,
    docTitle: "Shop Wick",
    path: "/",
    hasProducts: products.length > 0,
    shopActive: true,
    productCss: true,
  };
  res.render("shop", data);
};
