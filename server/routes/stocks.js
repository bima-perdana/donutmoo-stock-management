import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET all stocks
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM stocks");
  res.json(result.rows);
});

// ADD stock
router.post("/", async (req, res) => {
  const { name, quantity, satuan, price } = req.body;
  const result = await pool.query(
    "INSERT INTO stocks (name, quantity, satuan, price) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, quantity, satuan, price]
  );
  res.json(result.rows[0]);
});

export default router;
