const Product = require("../models/product");
const Cart = require("../models/cart");
// const product = [];

exports.getAllProducts = (req, res, next) => {
  Product.findAll()
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

  Product.findByPk(id)
    .then((product) => {
      console.log(product);
      res.render("shop/product-detail", {
        docTitle: product.title,
        path: "/products",
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });

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
  Product.findAll()
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
    .then((cart) => {
      // console.log(cart);
      return cart.getProducts();
    })
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
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      let newQuantity = 1;
      if (product) {
        // ...
      }
      return Product.findByPk(prodId)
        .then((product) => {
          fetchedCart.addProduct(product, { through: { qty: newQuantity } });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch();
  res.redirect("/products");
};

exports.postDeleteCart = (req, res, next) => {
  const id = req.params.prodId;
  const price = req.body.prodPrice;
  Cart.deleteById(id, price);
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { docTitle: "Your Order", path: "/orders" });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { docTitle: "Checkout", path: "/checkout" });
};
