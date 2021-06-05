const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/category.controllers");
const { body } = require("express-validator");

router.get("/categories", categoryControllers.getCategories);
router.get("/categories/:id", categoryControllers.getCategoryById);

router.post(
  "/categories",
  body("name").notEmpty(),
  categoryControllers.createCategory
);

router.put(
  "/categories/:id",
  body("name").notEmpty(),
  categoryControllers.updateCategory
);

router.delete('/categories/:id',categoryControllers.deleteCategory);

module.exports = router;
