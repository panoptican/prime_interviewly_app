var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

/* POST adds a group of interviewers to the event document */

router.post('/', function(req, res, next){
    if(Object.keys(req.body).length > 0){
        var event = {
            cohort: req.body.cohort,
            type: req.body.type
        };
        Event.addInterviewersBulk(event, function(err, interviewers){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.json(interviewers);
            }
        })
    };

    //if(Object.keys(req.body).length > 0){
    //    var event = {
    //        cohort: req.body.cohort,
    //        type: req.body.type
    //    };
    //    Event.addStudentsBulk(event, function(err, students){
    //        if(err){
    //            console.log(err);
    //            next(err);
    //        } else {
    //            res.json(students);
    //        }
    //    })
    //}
});

module.exports = router;