const express = require('express');
const app = express();
const loggingMiddleware = require('./loggingMiddleware');

app.use(loggingMiddleware);

app.get('/', (req, res) => {
  res.send('GET request received');
});

app.post('/', (req, res) => {
  res.send('POST request received');
});

const PORT = 3050; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

