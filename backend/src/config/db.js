const mysql = require("mysql2");
require("dotenv").config();
console.log("CWD:", process.cwd());
console.log("test",process.env.DB_HOST)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});
console.log("test",process.env.DB_HOST)
db.connect((err) => {
    if (err) {
        console.log(" Database connection failed");
        console.log(err);
        return;
    }

    console.log(" MySQL Connected Successfully");
});

module.exports = db;