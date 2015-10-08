var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Event = require('../models/event');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


router.post('/event', function(req, res, next){
    console.log(req.body);
    var event = new Event({
        name: req.body.name,
        organizer: req.body.organizer,
        location: req.body.location,
        description: req.body.description,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        interviewDuration: req.body.duration
    });
    event.save(function(err){
        if(err){
            throw(err);
        }
    });
    res.sendStatus(200);
});

router.get('/users', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/students', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/interviewer', function(req, res, next) {
    res.send('respond with a resource');
});
module.exports = router;
