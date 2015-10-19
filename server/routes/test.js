var express = require('express');
var router = express.Router();
var Tools = require('../lib/tools');
var Students = require('../db/student');
var Interviewers = require('../db/interviewer');
var Event = require('../db/event');
var Schedule = require('../db/schedule');
var async = require('async');

router.get('/db', function(req, res, next){
    //runs each function in series
    async.waterfall([
        function(callback){
            //find interviewers for event
           Interviewers.find({}, function(err, interviewers){
               if(err){console.log(err)}
               callback(null, interviewers);
           })
        },
        function(interviewers, callback){
            //find students for event
            Students.find({cohort: 'Delta'}, function(err, students){
                if(err){console.log(err)}
                callback(null, interviewers, students);
            })
        },
        function(interviewers, students, callback){
            //create all possible interview combinations
            Tools.combine(interviewers, students, function(combinations){
                callback(null, interviewers, students, combinations);
            })
        },
        function(interviewers, students, combinations, callback){
            //schedule interviews
            Tools.schedule(9, interviewers, students, combinations, 6, 2, function(schedule){
                callback(null, schedule);
            })
        },
        function(schedule, callback){
            //save schedule to database
            Schedule.add(schedule, function(err, schedule){
                callback(null, schedule);
            })
        }
    ], function(err, result){
        if(err){console.log(err)}
        res.json(result);
    });
});


module.exports = router;