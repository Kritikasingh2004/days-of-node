/**
 * Express middleware to log incoming requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */

const express = require("express");
const app = express();

function requestLoggerMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;

  console.log(`${timestamp} - ${method} request received`);

  next();
}


app.use(requestLoggerMiddleware);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

//starting the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
