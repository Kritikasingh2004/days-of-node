const express = require('express');
const app = express();
const port = 3000;

function errorHandler(err, req, res, next) {
  if (err.message === 'InvalidPositiveInteger') {
    res.status(400).json({ error: 'Invalid positive integer provided' });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function validatePositiveInteger(req, res, next) {
  const number = parseInt(req.query.number);

  if (Number.isInteger(number) && number > 0) {
    next();
  } else {
    const error = new Error('InvalidPositiveInteger');
    next(error); 
  }
}

app.get('/positive', validatePositiveInteger, (req, res) => {
  res.json({ message: 'Success! Valid positive integer provided.' });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
