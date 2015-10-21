var StudentModel = require('../models/student');
var Converter = require('csvtojson').Converter;
var converter = new Converter({});
var fs = require('fs');
var path = require('path');

var Student = {
    bulkImport: function(file, callback){
        fs.createReadStream(file).pipe(converter);

        converter.on("end_parsed", function(array){
            array.forEach(function(student){
                Student.add(student, function(err, student){
                    if(err){
                        console.log(err);
                        next(err);
                    } else {
                        console.log('added ' + student.fName + " " + student.lName);
                    }
                });
            });
            callback(null, array);
        });
    },
    add: function(body, callback){
        var newStudent = new StudentModel(body);
        //save student in database
        newStudent.save(function(err){
            if(err){
                console.log(err);
            }
        });
        callback(null, newStudent);
    },
    find: function(query, callback){
        StudentModel.findOne(query, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        });
    },
    findCohort: function(query, conditions, callback){
      StudentModel.find(query, conditions, function(err, doc){
          if(err){
              console.log(err);
          } else {
              callback(null, doc);
          }
      })
    },
    findManyById: function(array, callback){
      StudentModel.find({_id: {$in: array}}, function(err, docs){
          if(err){
              console.log(err);
          } else {
              callback(null, docs);
          }
      })
    },
    delete: function(query, callback){
        var conditions = query || {};
        StudentModel.findOneAndRemove(conditions, function(err, doc){
            if(err){
                console.log(err);
                next(err);
            } else {
                callback(null, doc);
            }
        });
    },
    update: function(query, body, callback) {
        StudentModel.findOneAndUpdate(query, body, {new: true}, function (err, doc) {
            if (err) {
                console.log(err);
                next(err);
            } else {
                callback(null, doc);
            }
        })
    },
    addWeight: function(query, weight, callback){
        StudentModel.findOneAndUpdate(query, weight, {new: true}, function(err, doc){
            if(err){
                console.log(err);
                next(err);
            } else {
                callback(null, doc);
            }
        })
    }
};

module.exports = Student;