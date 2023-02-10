const crypto = require("crypto");
require("dotenv").config();
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
// const sendGridTransport = require("nodemailer-sendgrid-transport");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
  tls: { rejectUnauthorized: false },
});

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
      return transport
        .sendMail({
          from: "jimoh.iyiola.test11@gmail.com",
          to: email,
          subject: "Welcome Onboard",
          html: "<h1>Welcome to ShopWick</h1>",
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getReset = (req, res, next) => {
  const errorMessage = req.flash("error");
  let message;
  if (errorMessage.length <= 0) {
    message = null;
  } else {
    message = errorMessage[0];
  }

  res.render("auth/reset", {
    docTitle: "Reset Password",
    path: "/reset",
    errorMessage: message,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No user found with that email");
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        res.redirect("/");
        return transport
          .sendMail({
            from: "jimoh.iyiola.test11@gmail.com",
            to: req.body.email,
            subject: "Password Reset",
            html: `
            <p>You requested a password reset</p>
            <p>Click this <a href = "http://localhost:3000/reset/${token}">link</a> to set a new password</p>
          `,
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const userToken = req.params.token;

  User.findOne({
    resetToken: userToken,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      const errorMessage = req.flash("error");
      let message;
      if (errorMessage.length <= 0) {
        message = null;
      } else {
        message = errorMessage[0];
      }
      res.render("auth/new-password", {
        docTitle: "New Password",
        path: "/new-password",
        errorMessage: message,
        userId: user._id.toString(),
        token: userToken,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {
  const token = req.body.userToken;
  const id = req.body.userId;
  const newPassword = req.body.password;
  let resetUser;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
    _id: id,
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
