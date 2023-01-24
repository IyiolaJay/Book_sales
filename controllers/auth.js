const User = require("../models/users");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split("=")[1].trim();
  // console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    docTitle: "Login",
    path: "/login",
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader("Set-Cookie", "loggedIn=true");
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }
      return bcrypt.compare(password, user.password).then((doMatch) => {
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
  res.render("auth/signup", {
    docTitle: "signup",
    path: "/signup",
  });
};

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.redirect("/login");
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
    })
    .catch((err) => {
      console.log(err);
    });
};
