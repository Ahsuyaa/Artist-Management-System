// Change this line from artist.json to your actual db.js connection file
const db = require('../config/db'); 
const User = require('../models/userModel');
const { hashPassword, comparePassword } = require('../utils/hash');

class AuthService {
    async registerUser(userData) {
        // 1. Map row data to the native Model instance
        const user = new User(userData);

        // 2. Delegate schema properties validation to the model
        if (!userData.password) {
            throw new Error('Password is required');
        }
        user.validate();

        // 3. Check if email already exists
        const [rows] = await db.execute(
            'SELECT id FROM users WHERE email = ?',
            [user.email]
        );

        if (rows.length > 0) {
            throw new Error('Email is already registered');
        }

        // 4. Securely hash the password string and update model
        user.password = await hashPassword(userData.password);

        const sql = `
            INSERT INTO users 
            (first_name, last_name, email, password, phone, dob, gender, address, role)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
            user.first_name,
            user.last_name,
            user.email,
            user.password,
            user.phone,
            user.dob,
            user.gender,
            user.address,
            user.role
        ];

        const [result] = await db.execute(sql, params);
        
        // Assign the newly generated primary key id to the instance
        user.id = result.insertId;

        // 5. Use model to clean/serialize user profile securely for response
        return user.toJSON();
    }

    async loginUser(email, password) {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        // 1. Fetch raw entry from database using native SQL driver
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        const dbRow = rows[0];

        if (!dbRow) {
            throw new Error('Invalid email or password');
        }

        // 2. Instantiate data row model mapping
        const user = new User(dbRow);

        // 3. Compare login attempt string vs encrypted hash stored in the model
        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        // 4. Strip sensitive parameters cleanly before shifting data up layers
        return user.toJSON();
    }
}

module.exports = new AuthService();