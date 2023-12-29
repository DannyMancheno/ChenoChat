"use strict";

var path = require('path');
var express = require('express');
var app = express();
app.use(express["static"](path.join(__dirname, 'client', 'build')));
var PORT = process.env.HTTP_PORT || 4001;
app.get('/', function (req, res) {
  res.send('Just gotta send it');
});
app.get('/flower', function (req, res) {
  res.json({
    name: 'dandelion',
    color: 'Blue-ish'
  });
});
app.listen(PORT, function () {
  console.log("server listen at port ".concat(PORT));
});
