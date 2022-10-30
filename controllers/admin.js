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

  req.user
    .createProduct({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
    })
    //Or
    // Product.create({
    //   title: title,
    //   imageUrl: imageUrl,
    //   price: price,
    //   description: description,
    //   userId: req.user.id,
    // })
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
  req.user
    .getProducts({
      where: {
        id: prodId,
      },
    })
    .then((products) => {
      const product = products[0];
      res.render("admin/edit-product", {
        docTitle: "Edit Product",
        editing: editMode,
        path: "/admin/edit-product",
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // Product.findOne({
  //   where: {
  //     id: prodId,
  //   },
  // })
  //   .then((product) => {
  //     res.render("admin/edit-product", {
  //       docTitle: "Edit Product",
  //       editing: editMode,
  //       path: "/admin/edit-product",
  //       product: product,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.postEditProduct = (req, res, next) => {
  const newProductId = req.body.productId;
  const newTitle = req.body.title;
  const newImageUrl = req.body.imageUrl;
  const newPrice = req.body.price;
  const newDescription = req.body.description;

  console.log(newProductId);

  Product.findByPk(newProductId)
    .then((product) => {
      product.title = newTitle;
      product.imageUrl = newImageUrl;
      product.price = newPrice;
      product.description = newDescription;
      return product.save();
    })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
