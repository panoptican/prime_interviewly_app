var express = require('express');
var router = express.Router();
var Interviewer = require('../db/interviewer');

/* GET interviewers */
router.get('/interviewer', function(req, res, next) {
    Interviewer.find(function(err, data){
      if(err){
        console.log(err);
        next(err);
      } else {
        res.json(data);
      }
    })
});

/* POST add new interviewer */
router.post('/interviewer', function(req, res, next){
    Interviewer.add(req.body, function(err, data){
      if(err){
        console.log(err);
        next(err);
      } else {
        res.json(data);
      }
    })
});

module.exports = router;
