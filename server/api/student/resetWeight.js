var express = require('express');
var router = express.Router();
var Student = require('../../db/student');

router.delete('/', function(req, res, next){
    var student = req.query;

    Student.resetWeight(student, function(err, data){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(data);
        }
    })
});

module.exports = router;