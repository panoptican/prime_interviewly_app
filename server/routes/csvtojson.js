var express = require('express');
var router = express.Router();
var Converter = require('csvtojson').Converter;
var converter = new Converter({});
var fs = require('fs');
var path = require('path');
var Student = require('../db/student');

router.get('/', function(req, res, next){
    var csv = path.join(__dirname, '../uploads/DeltaStudentsInfo.csv');

    Student.bulkImport(csv, function(err, data){
        if(err){
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

module.exports = router;