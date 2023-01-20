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
   const email = req.body.email;
  User.findOne({email:email})
    .then((user) => {
      if(!user){
        return res.redirect('/login');
      }
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        return res.redirect("/");
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
    isAuthenticated: false,
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
      const userNew = new User({ email: email, password: password, cart :{
        items:[]
      } });
      return userNew.save();
    })
    .then(() => {
      res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};
