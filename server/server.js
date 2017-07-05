/**
 *
 * API SERVER
 *
 */

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/test', function(req, res) {
  console.log('req ip', req.ip);
  //res.setHeader('Content-Type', 'application/json');
  res.json({"test": "1234"});
});

app.listen(3001, () => {
  console.log('server running');
});
