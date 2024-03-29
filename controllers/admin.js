// const Product = require("../models/product");
const mongoose = require("mongoose");
const Product = require("../models/product");
const { ObjectId } = require("mongodb");
const { validationResult } = require("express-validator");
const fileHelper = require("../util/file");

const flashMessage = (req) => {
  const errorMessage = req.flash("error");
  let message;
  if (errorMessage.length <= 0) {
    message = null;
  } else {
    message = errorMessage[0];
  }
  return message;
};

exports.addProducts = (req, res, next) => {
  const message = flashMessage(req);

  res.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: message,
    product: {
      title: "",
      imageUrl: "",
      price: "",
      description: "",
    },
    validationErrors: [],
  });
};

exports.postAddProducts = (req, res, next) => {
  const id = null;
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  const errors = validationResult(req);

  if (!image) {
    return res.status(422).render("admin/edit-product", {
      docTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      errorMessage: "Please Attach an Image File",
      product: {
        title: title,
        price: price,
        description: description,
      },
      validationErrors: errors.array(),
    });
  }
  console.log(image);
  const imageUrl = `/${image.path}`;

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      docTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      errorMessage: errors.array()[0].msg,
      product: {
        title: title,
        price: price,
        description: description,
      },
      validationErrors: errors.array(),
    });
  }

  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  });

  product
    .save()
    .then(() => {
      res.redirect("/admin/add-product");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;

  if (!editMode) {
    return res.redirect("/products");
  }
  Product.findById(prodId)
    .then((products) => {
      if (products.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/admin/products");
      }
      // console.log(products);
      res.render("admin/edit-product", {
        docTitle: "Edit Product",
        editing: editMode,
        path: "/admin/edit-product",
        product: products,
        errorMessage: null,
        hasError: false,
        validationErrors: [],
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const ProductId = req.body.productId;
  const newTitle = req.body.title;
  const newImage = req.file;
  const newPrice = req.body.price;
  const newDescription = req.body.description;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      docTitle: "Edit Product",
      editing: true,
      path: "/admin/edit-product",
      product: {
        title: newTitle,
        imageUrl: newImageUrl,
        price: newPrice,
        description: newDescription,
        _id: ProductId,
      },
      errorMessage: errors.array()[0].msg,
      hasError: true,
      validationErrors: errors.array(),
    });
  }

  Product.findById(ProductId)
    .then((product) => {
      product.title = newTitle;
      if (newImage) {
        fileHelper.deleteFile(product.imageUrl);
        product.imageUrl = `/${newImage.path}`;
      }
      product.price = newPrice;
      product.description = newDescription;

      return product.save().then(() => {
        res.redirect("/admin/products");
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        docTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return next(new Error("No Product Found"));
      }
      return fileHelper.deleteFile(product.imageUrl).then((results) => {
        console.log(results);
        return Product.deleteOne({ _id: productId, userId: req.user._id });
      });
    })
    .then(() => {
      res.status(200).json({
        message: "success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Deletion Failed",
      });
    });
};
