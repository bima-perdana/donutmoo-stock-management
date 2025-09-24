// file: hash.js
import bcrypt from "bcrypt";

const plainPassword = "admin123"; // password yang mau dipakai login
const saltRounds = 10;

const hash = await bcrypt.hash(plainPassword, saltRounds);
console.log("Hash:", hash);
