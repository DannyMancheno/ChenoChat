"use strict";

var path = require('path');
var express = require('express');
var app = express();
app.use(express["static"](path.join(__dirname, 'client', 'build')));
var PORT = process.env.HTTP_PORT || 4001;
var appVersion = '0.0.5';

// Base Server API _____________________________________

app.get('/appVersion', function (req, res) {
  res.send({
    appVersion: appVersion
  });
});
app.get('/ping', function (req, res) {
  res.send({
    response: 'pong!'
  });
});

// API Routes __________________________________________

app.use('/authentication', require('./routes/authentication'));
app.listen(PORT, function () {
  console.log("server listen at port ".concat(PORT));
});
