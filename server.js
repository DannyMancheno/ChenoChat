
const path = require('path');
const express = require('express');
const app = express();
const mysql = require('mysql');
// const test = require('oweirjwer');


app.use(express.static(path.join(__dirname, 'client', 'build')));

const PORT = process.env.HTTP_PORT || 8081;

const appVersion = '0.0.5'

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

app.get('/appVersion', (req, res)=>{

    res.send({appVersion: appVersion})
})

app.get('/ping', (req, res)=>{
    res.send({response: 'pong!'});
})


// API Routes __________________________________________

app.use('/authentication', require('./routes/authentication'))


app.listen(PORT, ()=>{
    console.log(`server listen at port ${PORT}`);
})

