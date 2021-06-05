const db = require("../database");
const { validationResult } = require("express-validator");

const getCategories = (req, res) => {
  let sql = `SELECT id,name FROM categories`;
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

const getCategoryById = (req, res) => {
  let sql = `SELECT id,name FROM categories WHERE id = ${req.params.id}`;
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

const createCategory = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const sql = "INSERT INTO categories (name) VALUES (?)";
  const product = [req.body.name];
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

const updateCategory = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { id } = req.params;
    const sql = `UPDATE categories
  SET name = ?
  WHERE id=?`;
    const product = [req.body.name,id];
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

const deleteCategory = (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM categories WHERE id=?`, id, function (err) {
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
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
