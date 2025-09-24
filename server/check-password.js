// server/check-password.js
import bcrypt from "bcrypt";

const plainPassword = "admin123"; // password asli yang mau dites
const hashedPassword = "$2b$10$2rErevLywXBTX5t5ZY4x4uYyo.768WkDgzKr3iiJBfOhYC/1x9ARS"; // hash dari DB

const match = bcrypt.compareSync(plainPassword, hashedPassword);

if (match) {
  console.log("✅ Password cocok, bisa login pakai:", plainPassword);
} else {
  console.log("❌ Password tidak cocok, hash ini bukan dari:", plainPassword);
}
