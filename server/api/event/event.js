var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

/* GET event */
router.get('/', function(req, res, next) {
    var query = req.query || {};
    query.isArchived = false;
    Event.find(query, function(err, data){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(data);
        }
    })
});

/* GET event */
router.get('/archived', function(req, res, next) {
    var query = req.query || {};
    query.isArchived = true;
    Event.find(query, function(err, data){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(data);
        }
    })
});

/* POST add new event */
router.post('/', function(req, res, next){
    if(Object.keys(req.body).length > 0){
        Event.add(req.body, function(err, data){
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

/* DELETE event */
router.delete('/', function(req, res, next){
    if(Object.keys(req.query).length > 0){
        Event.delete(req.query, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.send('Deleted event ' + data._id);
            }
        })
    } else {
        res.send('Invalid request. Must specify event.');
    }
});

/* PUT update event */
router.put('/', function(req, res, next){
    if(Object.keys(req.query).length > 0){
        Event.update(req.query, req.body, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.send('Updated event ' + data._id);
            }
        })
    } else {
        res.send('Invalid request. Must specify event.');
    }
});

module.exports = router;