var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

router.get('/', function(req, res, next){
   res.sendStatus(200);
});

/* DELETE remove interviewer from event */
router.delete('/', function(req, res, next){
    var event = {
        cohort: req.body.cohort,
        type: req.body.type
    };
    var interviewer = {
        id: req.body.interviewerID
    };
    Event.removeInterviewer(event, interviewer, function(err, update){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(update);
        }
    })
});

module.exports = router;