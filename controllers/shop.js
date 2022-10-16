const Product = require("../models/product-sql");
const Cart = require("../models/cart");
// const product = [];

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
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
    .then(([products]) => {
      res.render("shop/product-detail", {
        docTitle: products[0].title,
        path: "/products",
        product: products[0],
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        prods: rows,
        docTitle: "Shop Wick",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  Cart.getCartProducts((cart) => {
    cartPrice = cart.totalPrice;

    Product.fetchAll((products) => {
      const productData = [];

      for (let product of products) {
        const cartItem = cart.products.find((p) => p.id === product.id);
        if (cartItem) {
          productData.push({
            cartProduct: product,
            qty: cartItem.qty,
          });
        }
      }
      console.log(cartPrice);
      res.render("shop/cart", {
        docTitle: "Cart",
        path: "/cart",
        products: productData,
        total: cartPrice,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productHiddenId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  // Cart.addProduct(prodId, )
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
