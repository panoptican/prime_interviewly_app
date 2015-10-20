var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

/* POST add student to event */

router.post('/', function(req, res, next){
    if(Object.keys(req.body).length > 0){
        var event = {
            cohort: req.body.cohort,
            type: req.body.type
        };
        var student = {
            id: req.body.id
        };
        Event.addStudentToEvent(student, event, function(err, student){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.json(student);
            }
        })
    }
});

module.exports = router;