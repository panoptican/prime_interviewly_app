var express = require('express');
var router = express.Router();
var Interviewer = require('../db/interviewer');

/* GET interviewers */
router.get('/interviewers', function(req, res, next) {
    var query = req.query || {};
    Interviewer.find(query, function(err, data){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(data);
        }
    })
});

/* POST add new interviewer */
router.post('/interviewers', function(req, res, next){
    if(Object.keys(req.body).length > 0){
        Interviewer.add(req.body, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.json(data);
            }
        })
    } else {
        res.send('Invalid request. Must specify data.');
    }
});

/* DELETE interviewer */
router.delete('/interviewers', function(req, res, next){
    if(Object.keys(req.query).length > 0){
        Interviewer.delete(req.query, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.send('Deleted interviewer ' + data._id);
            }
        })
    } else {
        res.send('Invalid request. Must specify interviewer.');
    }
});

/* PUT update interviewer */
router.put('/interviewers', function(req, res, next){
    if(Object.keys(req.query).length > 0){
        Interviewer.update(req.query, req.body, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.send('Updated interviewer ' + data._id);
            }
        })
    } else {
        res.send('Invalid request. Must specify interviewer.')
    }
});

module.exports = router;