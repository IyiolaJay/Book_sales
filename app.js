// const http = require("http");
const express = require("express");

const path = require("path");

const rootDir = require("./util/path");

const bodyParser = require("body-parser");

const app = express();

const errorController = require("./controllers/error");

const sequelize = require("./util/database");

const Product = require("./models/product"); //Imported for sequelize sync. Do not delete
const User = require("./models/users");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

app.set("view engine", "ejs");

// app.set("view engine", "pug"); //tells the express engine to use the pug templating engine
app.set("views", "views"); //Tells the express engine where to find the templates

const adminRoute = require("./routes/admin");

const shopRoute = require("./routes/shop");

// Imports above, middle-wares are in this section

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(shopRoute);
app.use("/admin", adminRoute);

app.use(errorController.get404);

// Associations definitions
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync()
  // .sync({ force: true })
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Hammed Jimoh",
        email: "hammed@gmail.com",
      });
    }
    return user;
  })
  .then((user) => {
    user.getCart().then((cart) => {
      if (!cart) {
        return user.createCart();
      }
      return cart;
    });

    // user.createCart();
  })
  .then((results) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log("Failed", err);
  });
