// const Product = require("../models/product");
const Product = require("../models/product");

exports.addProducts = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProducts = (req, res, next) => {
  const id = null;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  })
    .then(() => {
      res.redirect("/admin/add-product");
    })
    .catch((err) => {
      console.log(err);
    });
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

exports.postEditProduct = (req, res, next) => {
  const newProductId = req.body.productId;
  const newTitle = req.body.title;
  const newImageUrl = req.body.imageUrl;
  const newPrice = req.body.price;
  const newDescription = req.body.description;

  console.log(newProductId);

  const product = new Product(
    newProductId,
    newTitle,
    newImageUrl,
    newPrice,
    newDescription
  );

  product.save();
  res.redirect("/admin/products");
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

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  console.log(productId);
  Product.deleteById(productId);
  res.redirect("/admin/products");
};
