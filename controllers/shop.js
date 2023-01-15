const Product = require("../models/product");
const User = require("../models/users");
const Order = require("../models/order");
// const product = [];

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        docTitle: "All Product",
        path: "/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProductDetail = (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
    .then((product) => {
      res.render("shop/product-detail", {
        docTitle: product.title,
        path: "/products",
        product: product,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        docTitle: "Shop Wick",
        path: "/",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.session.user
    .populate("cart.items.productId")
    .then((users) => {
      const products = users.cart.items;

      res.render("shop/cart", {
        docTitle: "Cart",
        path: "/cart",
        products: products,

        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productHiddenId;
  let fetchedCart;
  let newQuantity = 1;

  Product.findById(prodId)
    .then((product) => {
      return req.session.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteCart = (req, res, next) => {
  const id = req.params.prodId;
  const price = req.body.prodPrice;
  req.user
    .deleteFromCart(id)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.session.user
    .populate("cart.items.productId")
    // .execPopulate()
    .then((users) => {
      const product = users.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          username: req.session.user.username,
          userId: req.session.user,
        },
        products: product,
      });
      return order.save();
    })
    .then(() => {
      req.session.user.clearCart();
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.session.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        docTitle: "Your Order",
        path: "/orders",
        orders: orders,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { docTitle: "Checkout", path: "/checkout" });
};
