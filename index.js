const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

//App setup


// Server setup
const port = process.envPORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server running on', port);