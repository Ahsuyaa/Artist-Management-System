require('dotenv').config({ path: '../.env' });
const pool = require("../src/config/db");
// 1. Import your hashPassword utility
const { hashPassword } = require('../src/utils/hash'); 

async function seedAdmin() {
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.query("USE artist_management");

    console.log("Seeding super admin...");

    const email = "admin@gmail.com";
    const plainPassword = "admin123"; // Keep this to print later

    const [rows] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      console.log(`Admin already exists: ${email}`);
      return;
    }

    // 2. Securely hash the password string before inserting
    const hashedPassword = await hashPassword(plainPassword);

    await connection.query(
      `INSERT INTO users 
      (first_name, last_name, email, password, role)
      VALUES (?, ?, ?, ?, ?)`,
      [
        "Super",
        "Admin",
        email,
        hashedPassword, // 3. Save the HASH, not the plain text
        "super_admin"
      ]
    );

    console.log("Super admin created successfully!");
    console.log("Email:", email);
    console.log("Password:", plainPassword);

  } catch (err) {
    console.error("Seeder error:", err);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

seedAdmin();