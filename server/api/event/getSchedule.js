var express = require('express');
var router = express.Router();
var Event = require('../../db/event');
var Students = require('../../db/student');
var Interviewers = require('../../db/interviewer');
var Tools = require('../../lib/tools');
var Schedule = require('../../db/schedule');
var async = require('async');

router.get('/', function(req, res, next){
    async.waterfall([
        function(callback){
            //find event
            Event.findOne({cohort: req.query.cohort, type: req.query.type}, function(err, event){
                if(err){console.log(err)}
                callback(null, event);
            })
        },
        function(event, callback){
            //grab students in event
            Students.findManyById(event.students, function(err, students){
                if(err){console.log(err)}
                callback(null, event, students);
            })
        },
        function(event, students, callback){
            //grab interviewers in event
            Interviewers.findManyById(event.interviewers, function(err, interviewers){
                if(err){console.log(err)}
                callback(null, event, students, interviewers);
            })
        },
        function(event, students, interviewers, callback){
            //create all possible interview combinations
            Tools.combine(interviewers, students, function(combinations){
                callback(null, event, interviewers, students, combinations);
            })
        },
        function(event, interviewers, students, combinations, callback){
            //create interview schedule
            Tools.schedule(9, interviewers, students, combinations, 7, 2, function(schedule){
                callback(null, schedule);
            })
        },
        function(schedule, callback){
            //save schedule to schedule db
            Schedule.add(schedule, function(err, schedule){
                if(err){console.log(err)}
                callback(null, schedule);
            })
        }
    ], function(err, result){
        if(err){console.log(err)}
        res.json(result);
    })
});

module.exports = router;