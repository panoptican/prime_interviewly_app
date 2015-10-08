var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var Student = require('../models/student');
var Interviewer = require('../models/interviewer');


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

router.post('/student', function(req, res, next) {
    console.log(req.body);

    var student = new Student({
        fName: req.body.fName,
        lName: req.body.lName,
        cohort: req.body.cohort,
        email: req.body.email
    });
    student.save(function(err){
        if(err){
            throw(err);
        }
    });
    res.sendStatus(200);
});

router.post('/interviewer', function(req, res, next) {
    console.log(req.body);
    var interviewer = new Interviewer({
        title: req.body.title,
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        company: req.body.company
    });
    interviewer.save(function(err){
        if(err){
            throw(err);
        }
    });
    res.sendStatus(200);
});

router.get('/user', function(req, res, next) {
    res.send('respond with a resource');
});
module.exports = router;
