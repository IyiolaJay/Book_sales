const Product = require("../models/product");
const Cart = require("../models/cart");
// const product = [];

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "All Product",
      path: "/products",
    });
  });
  // console.log(products);
};

exports.getProductDetail = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id, (product) => {
    // console.log(product);
    res.render("shop/product-detail", {
      docTitle: product.title,
      path: "/products",
      product: product,
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      docTitle: "Shop Wick",
      path: "/",
    });
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
