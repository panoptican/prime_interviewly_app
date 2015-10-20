var express = require('express'),
    router= express.Router(),
    User = require('../models/users');

router.post('/', function(req, res, next){
           User.findOne({
               username: req.body.username,
               email: req.body.email
           }, function(err, user){
               if(!user){
                   res.json({error: error})
               }
               user.password = req.body.password;
               user.save(function(err){
                   if(err){
                       console.log(err);
                   }
               });
               res.json({password: 'changed'})
           })
});

module.exports = router;