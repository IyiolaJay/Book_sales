// const http = require("http");
const express = require("express");
const path = require("path");
const rootDir = require("./util/path");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const errorController = require("./controllers/error");
const mongoose = require("mongoose");
const MongoDbStore = require("connect-mongodb-session")(session);

const User = require("./models/users");

app.set("view engine", "ejs");

// app.set("view engine", "pug"); //tells the express engine to use the pug templating engine
app.set("views", "views"); //Tells the express engine where to find the templates

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
const authRoute = require("./routes/auth");

const MONGODB_URI =
  "mongodb+srv://iyiola_dev:iyiola081719@cluster0.nfszgum.mongodb.net/shop?retryWrites=true&w=majority";
// Imports above, middle-wares are in this section
const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// app.use((req, res, next) => {
//   User.findById("63baff16b10e9160a824a699")
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.use(shopRoute);
app.use("/admin", adminRoute);
app.use(authRoute);

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
