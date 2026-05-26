const crypto = require("crypto");

const hashPassword = (password) => {
    return crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
};

const comparePassword = (password, hashedPassword) => {
    const hashedInput = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    return hashedInput === hashedPassword;
};

module.exports = {
    hashPassword,
    comparePassword
};