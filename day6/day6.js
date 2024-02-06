const express = require('express');
const app = express();
const port = 3000;

/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function greetHandler(req, res) {
  const { name } = req.query;

  if (name) {
    res.send(`Hello, ${name}!`);
  } else {
    res.send('Hello, Guest!');
  }
}

// Define the route
app.get('/greet', greetHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
