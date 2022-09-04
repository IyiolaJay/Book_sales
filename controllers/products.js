const product = [];

exports.getAllProducts = (req, res, next) => {
  const data = {
    prods: product,
    docTitle: "Shop Wick",
    path: "/",
    hasProducts: product.length > 0,
    shopActive: true,
    productCss: true,
  };
  res.render("shop", data);
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
  console.log(req.body.title);
  product.push({ title: req.body.title });
  res.redirect("/admin/add-product");
};
