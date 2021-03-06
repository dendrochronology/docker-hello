'use strict';

const express = require('express');

// Constants
const PORT = process.env.PORT || 80;

// App
const app = express();

var requestLogger = (req, res, next) => {
  const date = new Date();
  const method = req.method;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`${date.toISOString()} ${method} ${ip} ${req.originalUrl}`);
  next()
}

app.use(requestLogger)

app.get('/', (req, res) => {
  res.send('<html><body><h1>Hello World</h1></body></html>\n');
});


/*******************************************************************************
 * Health Check
 *   docs: https://docs.docker.com/engine/reference/builder/#healthcheck
 ******************************************************************************/
app.get('/healthz', function (req, res) {
  res.send('I am happy and healthy\n');
});


app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
