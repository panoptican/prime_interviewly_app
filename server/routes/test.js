var express = require('express');
var router = express.Router();
var Tools = require('../lib/tools');
var Students = require('../db/student');
var Interviewers = require('../db/interviewer');

router.get('/', function(req, res, next){

    Interviewers.find({}, function(err, interviewers){
       Students.find({cohort: 'Delta'}, function(err, students){
           Tools.combine(interviewers, students, function(combinations){
               Tools.schedule(9, interviewers, students, combinations, 7, 2, function(schedule){
                   res.json(schedule);
               })
           })
       })
    });
});

module.exports = router;