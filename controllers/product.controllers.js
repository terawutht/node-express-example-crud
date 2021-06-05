const db = require("../database");
const { validationResult } = require("express-validator");

const getProducts = (req, res) => {
  let sql = `SELECT products.id AS productId,products.name AS productName,categories.name AS categoryName 
    FROM products LEFT JOIN categories ON products.category_id = categories.id`;
  let params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      status: 200,
      dataList: rows,
    });
  });
};

const getProductById = (req, res) => {
  let sql = `SELECT products.id AS productId,products.name AS productName,categories.name AS categoryName 
  FROM products LEFT JOIN categories ON products.category_id = categories.id
  WHERE products.id = ${req.params.id}`;
  let params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      status: 200,
      data: rows,
    });
  });
};

const createProduct = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const sql = "INSERT INTO products (name, category_id) VALUES (?, ?)";
  const product = [req.body.name, req.body.category_id];
  db.run(sql, product, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      status: 200,
      message: "Successfully Create",
    });
  });
};

const updateProduct = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const { id } = req.params;
  const sql = `UPDATE products
SET name = ?, category_id = ?
WHERE id=?`;
  const product = [req.body.name, req.body.category_id, id];
  db.run(sql, product, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      status: 200,
      message: "Successfully Update",
    });
  });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM products WHERE id=?`, id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      status: 200,
      message: "Successfully deleted",
    });
  });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
