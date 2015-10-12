var StudentModel = require('../models/student');

var Student = {
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
        StudentModel.find(query, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        });
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
    }
};

module.exports = Student;