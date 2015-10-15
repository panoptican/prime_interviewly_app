var express = require('express'),
    router= express.Router(),
    nodemailer = require('nodemailer'),
    async = require('async'),
    User = require('../models/users');

router.get('/:token', function(req, res, next){
   User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, function(err, user){
    if(!user){
        res.json({error: 'error'});
    }
});

router.post('/:token', function(req, res, next){
    async.waterfall([
        function(done) {
            User.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: {$gt: Date.now()}
            }, function (err, user) {
                if (!user) {
                    res.json({error: 'error'})
                }
                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                user.save(function(err){
                    done(err, user);
                    })
                })
        },
    function(user, done){
        var transport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'nodemailertest123@gmail.com',
                pass: 'fakepassword'
            }
        });
        var mailOptions = {
            to: user.email,
            from: 'Prime Digital Academy',
            subject: 'Your Password has been reset',
            text: 'Hello, \n'+
                'This is a confirmation that your password has been reset'
        };
        transport.sendMail(mailOptions, function(err){
            done(err);
        });
    }
    ], function(err) {
    res.redirect('/');
    }
)
});

module.exports = router;