const jwt = require('jsonwebtoken');

module.exports = (payload) => {
    // مش محتاج await - jwt.sign مش async
    const token = jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        { expiresIn: '7d' }  // ← غيرها لـ 7 أيام أحسن
    );
    return token;
};