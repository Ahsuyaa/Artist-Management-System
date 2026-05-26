const authService = require('../services/authService');
const { generateToken } = require('../utils/jwt');

const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', chunk => body += chunk.toString());

        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (err) {
                reject(new Error('Invalid JSON format'));
            }
        });
    });
};

const sendJSON = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

const register = async (req, res) => {
    try {
        const body = await getRequestBody(req);

        const user = await authService.registerUser(body);
        const token = generateToken(user);

        sendJSON(res, 201, {
            message: 'User registered successfully',
            user,
            token
        });
    } catch (err) {
        sendJSON(res, 400, { error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const body = await getRequestBody(req);

        const user = await authService.loginUser(body.email, body.password);
        const token = generateToken(user);

        sendJSON(res, 200, {
            message: 'Login successful',
            user,
            token
        });
    } catch (err) {
        sendJSON(res, 401, { error: err.message });
    }
};

module.exports = { register, login };