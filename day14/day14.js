const cache = {};
const express = require('express');
const request = require('supertest');
const cacheExpirationTime = 60 * 1000;

function cachingMiddleware(req, res, next) {
  const url = req.originalUrl || req.url;
  const cachedResponse = cache[url];

  if (cachedResponse && Date.now() < cachedResponse.expirationTime) {
    console.log(`Returning cached response for ${url}:`, cachedResponse);
    res.send(cachedResponse.body);
  } else {
    const originalSend = res.send;
    res.send = (body) => {
      const expirationTime = Date.now() + cacheExpirationTime;
      cache[url] = {
        body: body,
        expirationTime: expirationTime
      };
      console.log(`Cached response for ${url}:`, cache[url]);
      originalSend.call(res, body);
    };
    console.log(`Proceeding with request for ${url}`);
    next();
  }
}

const app = express();

app.use(cachingMiddleware);

app.get('/test', (req, res) => {
  res.send('Cached response');
});

setTimeout(() => {
  app.get('/test', (req, res) => {
    res.send('New response after cache expiration');
  });
}, cacheExpirationTime + 1000);

request(app)
  .get('/test')
  .expect(200)
  .expect('Cached response')
  .end((err, res) => {
    if (err) throw err;
    console.log("Test case 1 passed");
  });

setTimeout(() => {
  setTimeout(() => {
    request(app)
      .get('/test')
      .expect(200)
      .expect('New response after cache expiration')
      .end((err, res) => {
        if (err) throw err;
        console.log("Test case 2 passed");
      });
  }, cacheExpirationTime + 1000);
}, cacheExpirationTime + 2000);
