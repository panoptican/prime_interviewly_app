var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var upload = multer({dest: path.join(__dirname, '../uploads')});
var Interviewer = require('../db/interviewer');
var Student = require('../db/student');

router.post('/', upload.single('file'), function(req, res, next){
   console.log(req.body);

   var filename = req.file.filename,
       target = req.body.target,
       csv = path.join(__dirname, '../uploads/' + filename);

   console.log(filename, target);

   if(target == '/interviewers'){
      Interviewer.bulkImport(csv, function(err, data){
         if(err){
            console.log(err);
         } else {
            res.json(data);
         }
      });
   } else if (target == '/students'){
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