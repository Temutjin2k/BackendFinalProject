require('dotenv').config(); 
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET;

function verifyToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next(); 
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

function verifyRole(requiredRole) {
    return (req, res, next) => {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            if (!decoded.role) {
                return res.status(403).json({ error: 'Access denied. No role found.' });
            }

            if (decoded.role !== requiredRole) {
                return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
            }

            req.user = decoded; 
            next();
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    };
}

module.exports = { verifyToken, verifyRole };
