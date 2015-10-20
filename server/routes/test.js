var express = require('express');
var router = express.Router();
var Tools = require('../lib/tools');
//var Students = require('../db/student');
//var Interviewers = require('../db/interviewer');
var Event = require('../db/event');
var Schedule = require('../db/schedule');
var async = require('async');

router.get('/db', function(req, res, next){
    //runs each function in series
    async.waterfall([
        function(callback){
            //find interviewers in selected event
           Event.find({interviewers: {}}, function(err, interviewers){
               if(err){console.log(err)}
               callback(null, interviewers);
           })
        },
        function(interviewers, callback){
            //find students in selected event
            Event.find({students: {}}, function(err, students){
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
            //create interview schedule
            Tools.schedule(9, interviewers, students, combinations, 7, 2, function(schedule){
                callback(null, schedule);
            })
        },
        function(schedule, callback){
            //save schedule to schedule database
            Schedule.add(schedule, function(err, schedule){
                callback(null, schedule);
            })
        }
    ], function(err, result){
        if(err){console.log(err)}
        res.json(result);
    });
});


router.get('/removeStudent', function(req, res, next){

    Event.removeStudent({name: req.query.name}, {student: req.query.student}, function(err, doc){
        if(err){
            console.log(err);
        } else {
            res.json(doc);
        }
    })

});

router.get('/findStudents', function(req, res, next){
   Event.find({name: req.query.name}, function(err, event){
       res.json(event.students);
   })
});


module.exports = router;