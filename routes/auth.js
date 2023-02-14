const express = require("express");

const { check, body } = require("express-validator");

const authController = require("../controllers/auth");

const User = require("../models/users");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignUp);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("please enter a valid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Please enter a valid password"),
  ],
  authController.postLogin
);

router.post("/logout", authController.postLogout);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid Email address")
      .custom((value, { req }) => {
        // if (value === "test@test.com") {
        //   throw new Error("Forbidden Email");
        // }
        // return true;
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email already exist");
          }
        });
      }),

    body(
      "password",
      `Please enter a password of at least 
    5 characters long and contains alphanumeric`
    )
      .isLength({ min: 5 })
      .isAlphanumeric("en-US"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ],
  authController.postSignUp
);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
