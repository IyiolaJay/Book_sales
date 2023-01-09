// const http = require("http");
const express = require("express");

const path = require("path");

const rootDir = require("./util/path");

const bodyParser = require("body-parser");

const app = express();

const errorController = require("./controllers/error");

const mongoose = require("mongoose");

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
  User.findById("63baff16b10e9160a824a699")
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

mongoose
  .connect(
    "mongodb+srv://iyiola_dev:iyiola081719@cluster0.nfszgum.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((results) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          username: "Iyiola",
          email: "iyiola@test.com",
          cart: { items: [] },
        });
        return user.save();
      }
    });
    console.log("connected");
    app.listen(3000);
  });
