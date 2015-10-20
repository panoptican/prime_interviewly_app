var express = require('express');
var router = express.Router();
var path = require('path');
var Student = require('../db/student');
var Interviewer = require('../db/interviewer');

router.post('/', function(req, res, next){
    var filename = req.body.filename,
        target = req.body.target,
        csv = path.join(__dirname, '../uploads/' + filename);

    if(target == 'interviewers'){
        Interviewer.bulkImport(csv, function(err, data){
            if(err){
                console.log(err);
            } else {
                res.json(data);
            }
        });
    } else if (target == 'students'){
        Student.bulkImport(csv, function(err, data){
            if(err){
                console.log(err);
            } else {
                res.json(data);
            }
        });
    }
});

module.exports = router;