var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

/* DELETE remove a student from an event */

router.delete('/', function(req, res, next){
    var event = {
        cohort: req.body.cohort,
        type: req.body.type
    };
    var student = {
        id: req.body.id
    };

    Event.removeStudent(event, student, function(err, response){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(response);
        }
    })

});

module.exports = router;