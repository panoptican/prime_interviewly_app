var express = require('express');
var router = express.Router();
var Interviewer = require('../db/interviewer');
var Student = require('../db/student');
var Event = require('../db/event');

//
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


//
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
    res.send('Invalid request. Must specify student.');
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
  }else{
    res.send('Invalid request. Must specify student.');
  }
});


//
/* EVENTS */
//

/* GET event */
router.get('/events', function(req, res, next) {
  var query = req.query || {};
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
router.post('/events', function(req, res, next){
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
router.delete('/events', function(req, res, next){
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
router.put('/events', function(req, res, next){
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

//
/* SCHEDULE */
//

/* GET schedule */
router.get('/schedule', function(req, res, next) {
  var query = req.query || {};
  Event.find(query, function(err, data){
    if(err){
      console.log(err);
      next(err);
    } else {
      res.json(data);
    }
  })
});

/* POST add new schedule */
router.post('/schedule', function(req, res, next){
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
    res.send('Invalid request. Must specify schedule.');
  }
});

/* DELETE schedule */
router.delete('/schedule', function(req, res, next){
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
    res.send('Invalid request. Must specify schedule.');
  }
});

/* PUT update schedule */
router.put('/schedule', function(req, res, next){
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
    res.send('Invalid request. Must specify schedule.');
  }
});

module.exports = router;
