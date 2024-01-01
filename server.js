
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'client', 'build')));

const PORT = process.env.HTTP_PORT || 4001;

const appVersion = '0.0.4'

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

