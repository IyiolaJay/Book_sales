const express = require("express");
const router = express.Router();
const path = require("path");
const adminController = require("../controllers/admin");
const isAuth = require("../middlewares/isAuth");
const { body } = require("express-validator");

router.get("/add-product", isAuth, adminController.addProducts);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title")
      .isString()
      .withMessage("Title field should contain text and number characters")
      .trim(),
    body("price").isFloat().trim().withMessage("Enter a valid Price"),

    body("description", "Please add a proper description")
      .isString()
      .isLength({ min: 8 })
      .trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.post(
  "/product",
  [
    body("title")
      .isString()
      .withMessage("Title field should contain text and number characters")
      .trim(),

    body("price").isFloat().trim().withMessage("Enter a valid Price"),

    body("description", "Please add a proper description")
      .isString()
      .isLength({ min: 8 })
      .trim(),
  ],
  isAuth,
  adminController.postAddProducts
);

router.get("/products", isAuth, adminController.getProducts);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
