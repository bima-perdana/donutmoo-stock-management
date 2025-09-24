import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET orders
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM orders ORDER BY id DESC");
  res.json(result.rows);
});

// ADD order
router.post("/", async (req, res) => {
  const { name, quantity, satuan, price } = req.body;
  const result = await pool.query(
    "INSERT INTO orders (name, quantity, satuan, price) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, quantity, satuan, price]
  );
  res.json(result.rows[0]);
});

// UPDATE status
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await pool.query(
    "UPDATE orders SET status=$1 WHERE id=$2 RETURNING *",
    [status, id]
  );
  res.json(result.rows[0]);
});

export default router;
