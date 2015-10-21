var InterviewerModel = require('../models/interviewer');
var Converter = require('csvtojson').Converter;
var converter = new Converter({});
var fs = require('fs');

var Interviewer = {
    bulkImport: function(file, callback){
        fs.createReadStream(file).pipe(converter);

        converter.on("end_parsed", function(array){
            array.forEach(function(interviewer){
                Interviewer.add(interviewer, function(err, interviewer){
                    if(err){
                        console.log(err);
                        next(err);
                    } else {
                        console.log('added ' + interviewer.fName + " " + interviewer.lName);
                    }
                });
            });
            callback(null, array);
        });
    },
    add: function(body, callback){
        var newInterviewer = new InterviewerModel(body);
        //save interviewer in database
        newInterviewer.save(function(err){
            if(err){
                console.log(err);
            }
        });
        callback(null, newInterviewer);
    },
    find: function(query, callback){
        InterviewerModel.findOne(query, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        });
    },
    findMany: function(query, callback){
      InterviewerModel.find(query, function(err, docs){
          if(err){
              console.log(err);
          } else {
              callback(null, docs);
          }
      })
    },
    findManyById: function(array, callback){
        InterviewerModel.find({_id: {$in: array}}, function(err, docs){
            if(err){
                console.log(err);
            } else {
                callback(null, docs);
            }
        })
    },
    delete: function(query, callback){
        var conditions = query || {};
        InterviewerModel.findOneAndRemove(conditions, function(err, doc){
            if(err){
                console.log(err);
                next(err);
            } else {
                callback(null, doc);
            }
        });
    },
    update: function(query, body, callback){
        InterviewerModel.findOneAndUpdate(query, body, {new: true}, function(err, doc){
            if(err){
                console.log(err);
                next(err);
            } else {
                callback(null, doc);
            }
        })
    },
    addWeight: function(query, weight, callback){
        InterviewerModel.findOneAndUpdate(query, weight, {new: true}, function(err, doc){
            if(err){
                console.log(err);
                next(err);
            } else {
                callback(null, doc);
            }
        })
    },
    editUnavail: function(query, slots, callback){
        InterviewerModel.findOneAndUpdate(query, {unavailable: slots}, {new: true}, function(err, doc){
            if(err){
                console.log(err);
                next(err);
            } else {
                callback(null, doc);
            }
        })
    }
};

module.exports = Interviewer;