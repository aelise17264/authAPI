const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const router = require('./router');

//App setup
app.use(morgan('combined')); //logging framework
app.use(bodyParser.json({type: '*/*'})); //any incoming request is converted into JSON
app.use(cors());
//these are our express middlewares
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))


//db setup
mongoose.connect("mongodb://localhost:27017/auth", {useNewUrlParser: true, useUnifiedTopology: true}); //creates a new database in mongodb called auth
mongoose.set('useCreateIndex', true);

router(app)


// Server setup
const port = process.envPORT || 4000;
const server = http.createServer(app);
server.listen(port);
console.log('Server running on', port);