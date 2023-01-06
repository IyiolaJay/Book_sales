const Product = require("../models/product");
const Cart = require("../models/cart");
const cartItem = require("../models/cart-item");
const User = require("../models/users");
// const product = [];

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        docTitle: "All Product",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(products);
};

exports.getProductDetail = (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
    .then((product) => {
      res.render("shop/product-detail", {
        docTitle: product.title,
        path: "/products",
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });

  //#####################
  // Product.findById(id)
  //   .then(([products]) => {
  //     res.render("shop/product-detail", {
  //       docTitle: products[0].title,
  //       path: "/products",
  //       product: products[0],
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        docTitle: "Shop Wick",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      res.render("shop/cart", {
        docTitle: "Cart",
        path: "/cart",
        products: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // Cart.getCartProducts((cart) => {
  //   cartPrice = cart.totalPrice;

  //   Product.fetchAll((products) => {
  //     const productData = [];

  //     for (let product of products) {
  //       const cartItem = cart.products.find((p) => p.id === product.id);
  //       if (cartItem) {
  //         productData.push({
  //           cartProduct: product,
  //           qty: cartItem.qty,
  //         });
  //       }
  //     }
  //     console.log(cartPrice);
  //     res.render("shop/cart", {
  //       docTitle: "Cart",
  //       path: "/cart",
  //       products: productData,
  //       total: cartPrice,
  //     });
  //   });
  // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productHiddenId;
  let fetchedCart;
  let newQuantity = 1;

  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
    });

  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then((products) => {
  //     let product;
  //     if (products.length > 0) {
  //       product = products[0];
  //     }

  //     if (product) {
  //       oldQuantity = product.cartItem.qty;
  //       newQuantity = oldQuantity + 1;
  //       return product;
  //     }
  //     return Product.findByPk(prodId);
  //   })
  //   .then((data) => {
  //     return fetchedCart.addProduct(data, { through: { qty: newQuantity } });
  //   })
  //   .catch();
  // res.redirect("/products");
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
  req.user
    .addOrder()
    // .then((cart) => {
    //   fetchedCart = cart;
    //   return cart.getProducts();
    // })
    // .then((products) => {
    //   return req.user
    //     .createOrder()
    //     .then((order) => {
    //       return order.addProducts(
    //         // products,
    //         // { through: { qty: products[0].cartItem.qty } }
    //         //  Or Use the method above.
    //         products.map((product) => {
    //           product.orderItem = { qty: product.cartItem.qty };
    //           return product;
    //         })
    //       );
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // })
    // .then((results) => {
    //   return fetchedCart.setProducts(null);
    // })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrder()
    .then((orders) => {
      res.render("shop/orders", {
        docTitle: "Your Order",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { docTitle: "Checkout", path: "/checkout" });
};
