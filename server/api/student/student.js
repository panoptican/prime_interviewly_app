var express = require('express');
var router = express.Router();
var Student = require('../../db/student');

/* GET students */
router.get('/', function(req, res, next) {
    var query = req.query || {};
    Student.find(query, function(err, data){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(data);
        }
    })
});

/* POST add new student */
router.post('/', function(req, res, next){
    if(Object.keys(req.body).length > 0){
        Student.add(req.body, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.json(data);
            }
        })
    } else {
        res.send('Invalid request. No data specified.');
    }
});

/* DELETE student */
router.delete('/', function(req, res, next){
    if(Object.keys(req.query).length > 0){
        Student.delete(req.query, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.send('Deleted interviewer ' + data._id);
            }
        })
    } else {
        res.send('Invalid request. Must specify student.');
    }
});

/* PUT update student */
router.put('/', function(req, res, next){
    if(Object.keys(req.query).length > 0){
        Student.update(req.query, req.body, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.send('Updated student ' + data._id);
            }
        })
    }else{
        res.send('Invalid request. Must specify student.');
    }
});

module.exports = router;