// const Product = require("../models/product");
const Product = require("../models/product");
const { ObjectId } = require("mongodb");

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

  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id
  );

  product
    .save()
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

  console.log(prodId);

  if (!editMode) {
    return res.redirect("/products");
  }
  Product.findById(prodId)
    .then((products) => {
      // console.log(products);
      res.render("admin/edit-product", {
        docTitle: "Edit Product",
        editing: editMode,
        path: "/admin/edit-product",
        product: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const ProductId = req.body.productId;
  const newTitle = req.body.title;
  const newImageUrl = req.body.imageUrl;
  const newPrice = req.body.price;
  const newDescription = req.body.description;

  const product = new Product(
    newTitle,
    newPrice,
    newDescription,
    newImageUrl,
    ProductId,
    req.user._id
  );
  product
    .save()
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        docTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  console.log(productId);
  Product.deleteById(productId)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
