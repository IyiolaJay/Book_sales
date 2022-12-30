// const http = require("http");
const express = require("express");

const path = require("path");

const rootDir = require("./util/path");

const bodyParser = require("body-parser");

const app = express();

const errorController = require("./controllers/error");

const mongoConnect = require("./util/database").mongoConnect;

const User = require("./models/users");

app.set("view engine", "ejs");

// app.set("view engine", "pug"); //tells the express engine to use the pug templating engine
app.set("views", "views"); //Tells the express engine where to find the templates

const adminRoute = require("./routes/admin");

const shopRoute = require("./routes/shop");

// Imports above, middle-wares are in this section

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("63adc07919019465c843d358")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(shopRoute);
app.use("/admin", adminRoute);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
