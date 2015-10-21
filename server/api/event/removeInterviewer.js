var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

/* DELETE remove interviewer from event */

router.delete('/', function(req, res, next){
    var event = req.query,
        interviewer = req.body;

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