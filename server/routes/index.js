var express = require('express');
var router = express.Router();
var Tools = require('../lib/tools');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next){
  var students = [
    {name: "Allan", scheduled: {with:{}, count:{total: 0}}},
    {name: "Ben", scheduled: {with:{}, count:{total: 0}}},
    {name: "Brendan", scheduled: {with:{}, count:{total: 0}}},
    {name: "Garrett", scheduled: {with:{}, count:{total: 0}}},
    {name: "Jacob", scheduled: {with:{}, count:{total: 0}}},
    {name: "James", scheduled: {with:{}, count:{total: 0}}},
    {name: "Jason S.", scheduled: {with:{}, count:{total: 0}}},
    {name: "Jason N.", scheduled: {with:{}, count:{total: 0}}},
    {name: "Kate", scheduled: {with:{}, count:{total: 0}}},
    {name: "Kim", scheduled: {with:{}, count:{total: 0}}},
    {name: "Kamie", scheduled: {with:{}, count:{total: 0}}},
    {name: "Katie", scheduled: {with:{}, count:{total: 0}}},
    {name: "Madeleine", scheduled: {with:{}, count:{total: 0}}},
    {name: "Martha", scheduled: {with:{}, count:{total: 0}}},
    {name: "Matthew", scheduled: {with:{}, count:{total: 0}}},
    {name: "Shawn", scheduled: {with:{}, count:{total: 0}}},
    {name: "Vas", scheduled: {with:{}, count:{total: 0}}}
  ];

  var interviewers = [
    {name: "name", company: "Versique", scheduled: {}, unavailable: {}, id: 0, breaks: 0, single: true},
    {name: "name", company: "TPS", scheduled: {}, unavailable: {}, id: 1, breaks: 0, single: true},
    {name: "Jacqui", company: "ICS", scheduled: {}, unavailable: {}, id: 2, breaks: 0, single: false},
    {name: "Nichole", company: "ICS", scheduled: {}, unavailable: {}, id: 3, breaks: 0, single: false},
    {name: "Sean", company: "ICS", scheduled: {}, unavailable: {}, id: 4, breaks: 0, single: false},
    {name: "name", company: "The Creative Group", scheduled: {}, unavailable: {}, id: 5, breaks: 0, single: true},
    {name: "name", company: "Horizontal Integration", scheduled: {}, unavailable: {}, id: 6, breaks: 0, single: true},
    {name: "Joel", company: "BI", scheduled: {}, unavailable: {}, id: 7, breaks: 0, single: false},
    {name: "Terrie", company: "BI", scheduled: {}, unavailable: {}, id: 8, breaks: 0, single: false},
    {name: "Ashley", company: "Digital People", scheduled: {}, unavailable: {}, id: 10, breaks: 0, single: false},
    {name: "Katie", company: "Digital People", scheduled: {}, unavailable: {}, id: 11, breaks: 0, single: false},
    {name: "Erin", company: "Digital People", scheduled: {}, unavailable: {}, id: 12, breaks: 0, single: false},
    {name: "Bryan", company: "Digital People", scheduled: {}, unavailable: {}, id: 13, breaks: 0, single: false},
    {name: "Megan", company: "Experis", scheduled: {}, unavailable: {}, id: 14, breaks: 0, single: false},
    {name: "Dana", company: "Experis", scheduled: {}, unavailable: {}, id: 15, breaks: 0, single: false},
    {name: "name", company: "Azule Staffing", scheduled: {}, unavailable: {slot8: true, slot9: true}, id: 16, breaks: 0, single: true}
  ];

  Tools.combine(interviewers, students, function(combinations){
    Tools.schedule(9, interviewers, students, combinations, 7, 2, function(schedule){
      res.json(schedule);
    })
  })

});

router.get('/*');

module.exports = router;
