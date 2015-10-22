var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next){
    var student = req.query,
        weight = req.body;

    Student.addWeight(student, weight, function(err, data){
       if(err){
           console.log(err);
           next(err);
       } else {
           res.json(data);
       }
    });
});

module.exports = router;