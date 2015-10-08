var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


router.post('/event', function(req, res, next){
    var event = new Event({
        name: req.body.name,
        organizer:req.body.organizer,
        location:req.body.location.,
        description:req.body.description,
        date:req.body.date,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        interviewDuration:req.body.duration,
        Students:req.body.student,
        Interviewers:req.body.interviewer

    })
});

router.get('/users', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/students', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/interviewer', function(req, res, next) {
    res.send('respond with a resource');
});
module.exports = router;
