"use strict";

var path = require('path');
var express = require('express');
var app = express();
var mysql = require('mysql');
app.use(express["static"](path.join(__dirname, 'client', 'build')));
var PORT = process.env.HTTP_PORT || 8081;
var appVersion = '0.0.5';

// Database Information _______________________________

// var connection = mysql.createConnection({
//     host: 'awseb-e-y9giweg2ci-stack-awsebrdsdatabase-znskistgmgix.cqdvk67uu8ru.us-east-2.rds.amazonaws.com',
//     user: 'ChenoChatRoot',
//     password: 'dvm1181997CHENOCHATDB',
//     port: '3306'
// })

// testDB();
// function testDB(){
//     connection.query(`SELECT * FROM ChenoChat.UserAccount`, (err, result)=>{
//         if(err) console.log('Failed');
//         console.log('Success!');
//         console.log(result);
//     })
// }

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
