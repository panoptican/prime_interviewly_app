var express = require('express');
var router = express.Router();
var Interviewer = require('../db/interviewer');
var Student = require('../db/student');

/* INTERVIEWERS */
//

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
    Interviewer.add(req.body, function(err, data){
      if(err){
        console.log(err);
        next(err);
      } else {
        res.json(data);
      }
    })
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
    res.send('Invalid request. Must specify interviewer ID.');
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
  }
});


/* STUDENTS */
//

/* GET students */
router.get('/students', function(req, res, next) {
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
router.post('/students', function(req, res, next){
  Student.add(req.body, function(err, data){
    if(err){
      console.log(err);
      next(err);
    } else {
      res.json(data);
    }
  })
});

/* DELETE student */
router.delete('/students', function(req, res, next){
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
    res.send('Invalid request. Must specify student ID.');
  }
});

/* PUT update student */
router.put('/students', function(req, res, next){
  if(Object.keys(req.query).length > 0){
    Student.update(req.query, req.body, function(err, data){
      if(err){
        console.log(err);
        next(err);
      } else {
        res.send('Updated student ' + data._id);
      }
    })
  }
});

module.exports = router;
