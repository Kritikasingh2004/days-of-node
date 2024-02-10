/**
 * Express application serving static files from the "public" directory
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

const express = require('express');
const path = require('path');

function staticFileServer(req, res) {
  const app = express();

  app.use(express.static('public'));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
}

staticFileServer();
