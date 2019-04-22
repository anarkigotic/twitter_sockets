'use strict'

var bodyParser = require("body-parser");
var express = require('express');
var app = express();
// var noticiasRoute = require('./routes/noticiasRoute');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var analyticaldata = require('./routes/analyticalData');
var userRoute = require('./routes/userRoute');
var controller = require('./controllers/analyticalDataController');


app.use(express.static('public'));
app.use(function (req, res, next) {              //* cualquiera puede hacer peticiones a nuestra api rest
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-API-kEY, Origin, X-Requested-With,Content-Type,Accept,Access--Control-Request-Method')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.header('Allow', 'GET,POST,PUT,DELETE,OPTIONS')
  next()
})
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 100000 }));
app.use(bodyParser.json({ limit: '50mb', extended: true, parameterLimit: 100000 }));




app.use('/twitter', analyticaldata);
app.use('/user', userRoute);

app.get("/prueba", (req, res) => {
  res.json("prueba")
})




io.on('connection', controller.evaluateData);





module.exports = server;