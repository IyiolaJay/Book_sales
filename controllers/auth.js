const User = require("../models/users");

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split("=")[1].trim();
  // console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    docTitle: "Login",
    path: "/login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader("Set-Cookie", "loggedIn=true");
  User.findById("63baff16b10e9160a824a699")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;

      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
};
