var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

/* POST to archive event */
router.post('/', function(req, res, next){
    var event = req.query;
    Event.archive(event, function(err, data){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(data);
        }
    })
});

module.exports = router;