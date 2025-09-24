// server/check-db-password.js
import pkg from "pg";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config(); // baca .env

const { Pool } = pkg;

// connect ke database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // pastiin ada di .env
});

const username = "admin";        // user yang mau dicek
const plainPassword = "admin123"; // password yang mau dites

async function checkPassword() {
  try {
    const res = await pool.query(
      "SELECT password FROM users WHERE username = $1",
      [username]
    );

    if (res.rows.length === 0) {
      console.log("❌ User tidak ditemukan");
      return;
    }

    const hashedPassword = res.rows[0].password;
    const match = bcrypt.compareSync(plainPassword, hashedPassword);

    if (match) {
      console.log(`✅ Password cocok untuk user ${username}`);
    } else {
      console.log(`❌ Password SALAH untuk user ${username}`);
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    pool.end();
  }
}

checkPassword();
