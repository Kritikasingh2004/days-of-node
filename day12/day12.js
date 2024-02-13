const rateLimitMap = {}; 

/**
 * Rate-limiting middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function rateLimitMiddleware(req, res, next) {
  const ip = req.ip;
  const limit = 5;
  const windowMs = 60 * 1000; 

  if (!rateLimitMap[ip]) {
    rateLimitMap[ip] = {
      count: 0,
      lastRequestTime: Date.now(),
    };
  }

  const now = Date.now();
  const elapsedTime = now - rateLimitMap[ip].lastRequestTime;

  if (elapsedTime > windowMs) {
    rateLimitMap[ip] = {
      count: 1,
      lastRequestTime: now,
    };
  } else {
    rateLimitMap[ip].count++;
  }

  if (rateLimitMap[ip].count > limit) {
    return res.status(429).json({ error: 'Too Many Requests' });
  }

  next();
}

const express = require('express');
const app = express();

app.use(rateLimitMiddleware);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
