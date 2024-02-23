const express = require('express');
const fetch = require('isomorphic-fetch');
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const jwtaccesskey = 'EWmfUcl65KU1BnmCpXyyORdCd0rU9PAZ'
const mysql = require('mysql');


const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

// ########## DATABASE CONNECTION ##########################################################################################################
// #########################################################################################################################################
var connection = mysql.createConnection({
    host: 'awseb-e-y9giweg2ci-stack-awsebrdsdatabase-znskistgmgix.cqdvk67uu8ru.us-east-2.rds.amazonaws.com',
    user: 'ChenoChatRoot',
    password: 'dvm1181997CHENOCHATDB',
    port: '3306'
})

// ########## ROUTES #######################################################################################################################
// #########################################################################################################################################

router.get('/login', (req, res)=>{
    res.send({response: 'login reached'});
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
                // If data value is empty , deny
                if(data.username == '' || data.password == '' || data.confirm == '' || data.birthday == '' || data.securityQ == '' || data.securityA == '') dataValid = false;
                // If username regex is true , deny
                if(/[^a-zA-Z0-9]+/.test(data.username)) dataValid = false;
                // If password/confirm don't match , deny
                if(data.password !== data.confirm) dataValid = false;
                // If no tests failed, proceed to submit data to registration
                if(dataValid){
                    connection.query(
                        `INSERT INTO ChenoChat.UserAccount (username, password, birthday, securityQ, securityA) VALUE
                        (
                            '${data.username}', 
                            '${bcrypt.hashSync(data.password, 10)}',
                            '${data.birthday}',
                            '${data.securityQ}',
                            '${bcrypt.hashSync(data.securityA, 10)}'
                        )`, (err, result)=>{
                            if(err) res.send({success: false, message: 'Failed to register account - Error A0001'});
                            else res.send({success: true, message: 'Successfully registered an account!'});
                        }
                    )
                }
                else res.send({success: false, message: 'Registration data was invalid - Error A0002'});
            }
        })
    }
})

module.exports = router;