const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/product.controllers");
const { body } = require("express-validator");

router.get("/products", productControllers.getProducts);
router.get("/products/:id", productControllers.getProductById);

router.post(
  "/products",
  body("name").notEmpty(),
  body("category_id").notEmpty(),
  productControllers.createProduct
);

router.put(
  "/products/:id",
  body("name").notEmpty(),
  body("category_id").notEmpty(),
  productControllers.updateProduct
);

router.delete('/products/:id',productControllers.deleteProduct);

module.exports = router;
