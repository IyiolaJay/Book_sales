// const http = require("http");
require("dotenv").config();
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
const flash = require("connect-flash");
const multer = require("multer");

app.set("view engine", "ejs");

// app.set("view engine", "pug"); //tells the express engine to use the pug templating engine
app.set("views", "views"); //Tells the express engine where to find the templates

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
const authRoute = require("./routes/auth");

const cSrfProtection = cSurf();

const MONGODB_URI = process.env.URI;
// Imports above, middle-wares are in this section
const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    return cb(null, true);
  }
  cb(null, false);
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(cSrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
      next(new Error(err));
    });
});

app.use(shopRoute);
app.use("/admin", adminRoute);
app.use(authRoute);

// app.get("/500", errorController.get500);
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).render("500", {
    docTitle: "Error",
    path: "error",
    isAuthenticated: req.session.isLoggedIn,
  });
});

app.use(errorController.get404);

mongoose.connect(MONGODB_URI).then((results) => {
  console.log("connected");
  app.listen(3000);
});
