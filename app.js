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
const cSurf = require("csurf");
const User = require("./models/users");

app.set("view engine", "ejs");

// app.set("view engine", "pug"); //tells the express engine to use the pug templating engine
app.set("views", "views"); //Tells the express engine where to find the templates

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
const authRoute = require("./routes/auth");

const cSrfProtection = cSurf();

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

app.use(cSrfProtection);

app.use((req,res,next)=>{
  res.locals.csrfToken = req.csrfToken();
  res.locals.isAuthenticated = req.session.isLoggedIn
  next();
})


app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
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
app.use(authRoute);

app.use(errorController.get404);

mongoose.connect(MONGODB_URI).then((results) => {
  console.log("connected");
  app.listen(3000);
});
