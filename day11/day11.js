const express = require('express');
const jwt = require('jsonwebtoken'); 
const app = express();

const accessTokenSecret = 'NodeJs'; 

/**
 * Authentication middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function authenticationMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send('Unauthorized: No token provided');
    }

    try {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(401).send('Unauthorized: Invalid token');
            }
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(401).send('Unauthorized: Invalid token');
    }
}

app.get('/protected', authenticationMiddleware, (req, res) => {
    res.send('Welcome, authorized user!');
});

app.listen(3000, () => console.log('Server listening on port 3000'));
