const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
      ws.send(`Server received: ${message}`);
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
}

setupWebSocket(server);

app.get('/websocket', (req, res) => {
  res.sendFile(__dirname + '/day13.html');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
