var express = require('express');
var router = express.Router();
var user = require('../models/users');

router.post('/', function(req, res, next){
    if (req.body.username === undefined || !req.body.username.length) {
        console.log("Username Required.");
        res.status(400).send("Username Required.");
    } else if (req.body.password === undefined || !req.body.password.length) {
        console.log("Password Required.");
        res.status(400).send("Password Required.");
    }
    else {
        user.getAuthenticated(req.body, function (err, token, user) {
            if (err) {
                console.log(err);
                res.json({error: 'Invalid Username or Password'});
            }
            else if (token) {
                // We are sending the profile inside the token
                res.json({token: token, user: user});
            } else {
                res.status(401).send('Invalid Username or Password');
            }
        })
    }
});

module.exports = router;