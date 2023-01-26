const User = require("../models/users");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const transport = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: "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",
    },
  })
);

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split("=")[1].trim();
  const errorMessage = req.flash("error");
  let message;
  if (errorMessage.length <= 0) {
    message = null;
  } else {
    message = errorMessage[0];
  }

  res.render("auth/login", {
    docTitle: "Login",
    path: "/login",
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader("Set-Cookie", "loggedIn=true");
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password");
        return res.redirect("/login");
      }
      return bcrypt.compare(password, user.password).then((doMatch) => {
        if (!doMatch) {
          req.flash("error", "Invalid email or password");

          return res.redirect("/login");
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save((err) => {
          res.redirect("/");
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
};

exports.getSignUp = (req, res, next) => {
  const errorMessage = req.flash("error");
  let message;
  if (errorMessage.length <= 0) {
    message = null;
  } else {
    message = errorMessage[0];
  }

  res.render("auth/signup", {
    docTitle: "signup",
    path: "/signup",
    errorMessage: message,
  });
};

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        req.flash("error", "Email already exists");
        return res.redirect("/signup");
      }
      bcrypt.hash(password, 12).then((p) => {
        const userNew = new User({
          email: email,
          password: p,
          cart: {
            items: [],
          },
        });
        return userNew.save();
      });
    })
    .then(() => {
      res.redirect("/login");
      return transport.sendMail({
        from: "shopwick@samplemail.com",
        to: email,
        subject: "Welcome Onboard",
        html: "<h1>Welcome to ShopWick</h1>",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
