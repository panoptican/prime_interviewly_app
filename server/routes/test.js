var express = require('express');
var router = express.Router();
var Tools = require('../lib/tools');
var Students = require('../db/student');
var Interviewers = require('../db/interviewer');
var Event = require('../db/event');

router.get('/db', function(req, res, next){

    Interviewers.find({}, function(err, interviewers){
       Students.find({cohort: 'Delta'}, function(err, students){
           Tools.combine(interviewers, students, function(combinations){
               Tools.schedule(9, interviewers, students, combinations, 6, 2, function(schedule){
                   Event.addSchedule({name: 'Delta Mock Interviews'}, schedule, function(err, update){
                       res.json(update);
                   })
               })
           })
       })
    });
});

router.get('/', function(req, res, next){
    var students = [
        {fName: "Allan", scheduled: {with:{}, count:{total: 0}}},
        {fName: "Ben", scheduled: {with:{}, count:{total: 0}}},
        {fName: "Brendan", scheduled: {with:{}, count:{total: 0}}},
        {fName: "Garrett", scheduled: {with:{}, count:{total: 0}}},
        {fName: "Jacob", scheduled: {with:{}, count:{total: 0}}},
        {fName: "James", scheduled: {with:{}, count:{total: 0}}},
        {fName: "Jason S.", scheduled: {with:{}, count:{total: 0}}},
        {fName: "Jason N.", scheduled: {with:{}, count:{total: 0}}},
        {fName: "Kate", scheduled: {with:{}, count:{total: 0}}},
        {fName: "Kim", scheduled: {with:{}, count:{total: 0}}},
        {fName: "Kamie", scheduled: {with:{}, count:{total: 0}}},
        {fName: "Katie", scheduled: {with:{}, count:{total: 0}}},
        {fName: "Madeleine", scheduled: {with:{}, count:{total: 0}}},
        {fName: "Martha", scheduled: {with:{}, count:{total: 0}}},
        {fName: "Matthew", scheduled: {with:{}, count:{total: 0}}},
        {fName: "Shawn", scheduled: {with:{}, count:{total: 0}}},
        {fName: "Vas", scheduled: {with:{}, count:{total: 0}}}
    ];

    var interviewers = [
        {fName: "name", company: "Versique", scheduled: {}, unavailable: {}, _id: 0, breaks: 0, single: true},
        {fName: "name", company: "TPS", scheduled: {}, unavailable: {}, _id: 1, breaks: 0, single: true},
        {fName: "Jacqui", company: "ICS", scheduled: {}, unavailable: {}, _id: 2, breaks: 0, single: false},
        {fName: "Nichole", company: "ICS", scheduled: {}, unavailable: {}, _id: 3, breaks: 0, single: false},
        {fName: "Sean", company: "ICS", scheduled: {}, unavailable: {}, _id: 4, breaks: 0, single: false},
        {fName: "name", company: "The Creative Group", scheduled: {}, unavailable: {}, _id: 5, breaks: 0, single: true},
        {fName: "name", company: "Horizontal Integration", scheduled: {}, unavailable: {}, _id: 6, breaks: 0, single: true},
        {fName: "Joel", company: "BI", scheduled: {}, unavailable: {}, _id: 7, breaks: 0, single: false},
        {fName: "Terrie", company: "BI", scheduled: {}, unavailable: {}, _id: 8, breaks: 0, single: false},
        {fName: "Ashley", company: "Digital People", scheduled: {}, unavailable: {}, _id: 10, breaks: 0, single: false},
        {fName: "Katie", company: "Digital People", scheduled: {}, unavailable: {}, _id: 11, breaks: 0, single: false},
        {fName: "Erin", company: "Digital People", scheduled: {}, unavailable: {}, _id: 12, breaks: 0, single: false},
        {fName: "Bryan", company: "Digital People", scheduled: {}, unavailable: {}, _id: 13, breaks: 0, single: false},
        {fName: "Megan", company: "Experis", scheduled: {}, unavailable: {}, _id: 14, breaks: 0, single: false},
        {fName: "Dana", company: "Experis", scheduled: {}, unavailable: {}, _id: 15, breaks: 0, single: false},
        {fName: "name", company: "Azule Staffing", scheduled: {}, unavailable: {slot8: true, slot9: true}, _id: 16, breaks: 0, single: true}
    ];

    Tools.combine(interviewers, students, function(combinations){
        Tools.schedule(9, interviewers, students, combinations, 7, 2, function(schedule){
            res.json(schedule);
        })
    })
});

module.exports = router;