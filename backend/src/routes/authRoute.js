const { register, login } = require('../controllers/authController');

const authRouter = (req, res) => {
    const { method, url } = req;

    // POST /api/auth/register
    if (url === '/api/auth/register' && method === 'POST') {
        register(req, res);
        return true; 
    }

    // POST /api/auth/login
    if (url === '/api/auth/login' && method === 'POST') {
        login(req, res);
        return true; 
    }
    return false; 
};

module.exports = authRouter;