var express = require('express');
var router = express.Router();
var Student = require('../../db/student');

router.post('/', function(req, res, next){
    var interviewer = req.query,
        weight = req.body;

    Student.addWeight(interviewer, weight, function(err, data){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(data);
        }
    })
});

module.exports = router;