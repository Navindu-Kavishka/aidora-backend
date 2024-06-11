const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    // Extract token from the Authorization header
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Check if the authorization header starts with 'Bearer'
    if (!authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid authorization format' });
    }

    // Extract the token
    const token = authorizationHeader.split(' ')[1]; // 'Bearer TOKEN' -> 'TOKEN'
    console.log(token)

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Handle token verification errors
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
