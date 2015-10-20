var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

/* DELETE remove a student from an event */
router.delete('/', function(req, res, next){
    if(Object.keys(req.query).length > 1){
        Event.removeStudent(req.query.event, req.query.student, function(err, response){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.json(response);
            }
        })
    }
});

module.exports = router;