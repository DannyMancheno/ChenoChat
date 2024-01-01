
const express = require('express');
const router = express.Router();

router.get('/login', (req, res)=>{
    console.log('login api request');
    res.send({response: 'login reached'});
})

module.exports = router;