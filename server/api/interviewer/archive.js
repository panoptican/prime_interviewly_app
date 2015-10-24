var express = require('express');
var router = express.Router();
var Interviewer = require('../../db/interviewer');

router.post('/', function(req, res, next){
    var interviewer = req.query;

    Interviewer.archive(interviewer, function(err, data){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(data);
        }
    })
});

module.exports = router;