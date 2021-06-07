const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');

//App setup
app.use(morgan('combined')); //logging framework
app.use(bodyParser.json({type: '*/*'})); //any incoming request is converted into JSON
//these are our express middlewares

router(app)


// Server setup
const port = process.envPORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server running on', port);