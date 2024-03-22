const express = require('express');
const fetch = require('isomorphic-fetch');
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const jwtaccesskey = 'EWmfUcl65KU1BnmCpXyyORdCd0rU9PAZ'
const mysql = require('mysql');
// import { queryDB } from '../SharedFunctions/database';
const {queryDB} = require('../SharedFunctions/database')


const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

// Predefined values
let SELECT = 'SELECT'; 
let INSERT = 'INSERT';
let UPDATE = 'UPDATE';
let DELETE = 'DELETE';
// ########## ROUTES #######################################################################################################################
// #########################################################################################################################################

router.get('/login', (req, res)=>{
    res.send({response: 'login reached'});
})

router.post('/checkUsername', (req, res)=>{
    queryDB({
        statement: 'SELECT',
        table: 'UserAccount', 
        condition: {username: req.body.username}
    }).then(result=>{
        if(result.length) res.status(201).send(`Username is already in use`)
    })
})

router.post('/forgotpass', (req, res)=>{
    
})

router.post('/register', (req, res)=>{
    let data = req.body;

    

    if(data.recaptcha){
        const secretKey = '6Lc0b3MpAAAAAKpLa29yE1s0BmPHo4o8vD5QyoDR';
        const userResponse = data.recaptcha
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${userResponse}`;
        fetch(url, {method: 'post'}).then((response)=>response.json()).then((google_response)=>{
            if(google_response.success){
                //Server side data validation
                var dataValid = true;
                if(data.username === '' || data.password === '' || data.confirm === '' ||
                   data.birthday === '' || data.securityQ === ''||data.securityA === ''|| 
                   /[^a-zA-Z0-9]+/.test(data.username) || 
                   data.password !== data.confirm
                )  dataValid = false;
                // If no tests failed, proceed to submit data to registration
                if(dataValid){
                    // Check if username exists already
                    queryDB({
                        statement: 'SELECT',
                        table: 'UserAccount', 
                        condition: {username: data.username}
                    }).then(result=>{

                        let nameTaken = ['Username is already in use', 'Username taken', 'Darn, username is already in use :C'];
                        let nameSafe = ['Awesome, you created an account!', 'Congrats, you successfully registed', 'You did it! You registered!'];
                        
                        if(result.length) res.status(401).send(nameTaken[Math.floor(Math.random() * nameTaken.length)]);
                        else{
                            // Remove uneeded datacheckers for DB insert
                            delete data.confirm;
                            delete data.recaptcha;

                            
                            queryDB({
                                statement: INSERT,
                                table: 'UserAccount',
                                data: {
                                    ...data,
                                    password: bcrypt.hashSync(data.password, 10),
                                    securityA: bcrypt.hashSync(data.securityA, 10)
                                }
                            })
                            .then(result => res.status(201).send(nameSafe[Math.floor(Math.random() * nameSafe.length)]))
                            .catch(error => res.status(401).send('Oh oh, something wrong happened!'))  
                        }
                    }).catch(error => res.status(401).send('Database account registry check failed'));
                }
                else res.status(401).send('Registration data failed server check');
            }
        })
    }
})

module.exports = router;