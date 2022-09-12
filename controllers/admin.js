const Product = require("../models/product");

exports.addProducts = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProducts = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const products = new Product(title, imageUrl, price, description);
  // console.log(req.body.title);
  products.save();
  res.redirect("/admin/add-product");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;

  if (!editMode) {
    return res.redirect("/products");
  }
  Product.findById(prodId, (product) => {
    res.render("admin/edit-product", {
      docTitle: "Edit Product",
      editing: editMode,
      path: "/admin/edit-product",
      product: product,
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      docTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
