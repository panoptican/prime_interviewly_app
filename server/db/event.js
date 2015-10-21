var EventModel = require('../models/Event');
var Interviewers = require('./interviewer');
var Students = require('./student');

var Event = {
    add: function(body, callback){
        var newEvent = new EventModel(body);
        //save event in database
        newEvent.save(function(err){
            if(err){
                console.log(err);
            }
        });
        callback(null, newEvent);
    },
    find: function(query, callback){
        EventModel.findOne(query, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        });
    },
    delete: function(query, callback){
        var conditions = query || {};
        EventModel.findOneAndRemove(conditions, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        });
    },
    update: function(query, body, callback){
        EventModel.findOneAndUpdate(query, body, {new: true}, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        })
    },
    addSchedule: function(query, schedule, callback){
        EventModel.findOneAndUpdate(query, {$push: {schedule: schedule}}, {new: true}, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        })
    },
    addInterviewerToEvent: function(event, interviewer, callback){
        Interviewers.find({fName: interviewer.fName, company: interviewer.company}, '_id fName lName company', function(err, interviewer){
            if(err){
                console.log(err);
            } else {
                if(interviewer){
                    EventModel.findOneAndUpdate({cohort: event.cohort, type: event.type}, {$addToSet: {interviewers: interviewer}}, {new: true}, function(err, doc){
                        if(err){
                            console.log(err);
                        } else {
                            callback(null, doc);
                        }
                    })
                } else {
                    callback(null, 'No interviewer found with that ID.');
                }
            }
        });
    },
    removeInterviewer: function(event, interviewer, callback){
        EventModel.findOneAndUpdate({cohort: event.cohort, type: event.type},
            { $pull: {interviewers: {fName: interviewer.fName, company: interviewer.company}}}, {new: true}, function(err, event){
                if(err){
                    console.log(err);
                } else {
                    callback(null, event);
                }
        })
    },
    addBulkStudents: function(event, callback){
        EventModel.findOne({cohort: event.cohort, type: event.type}, function(err, event){
            Students.findCohort({cohort: event.cohort}, '_id fName lName', function(err, students){
                EventModel.findOneAndUpdate({_id: event._id}, {$addToSet: {students: {$each: students}}}, {new: true}, function(err, doc){
                    if(err){console.log(err)}
                    callback(null, doc);
                });
            });
        });
    },
    addBulkInterviewers: function(event, callback){
        EventModel.findOne({cohort: event.cohort, type: event.type}, function(err, event){
            Interviewers.findMany({}, '_id fName lName company', function(err, interviewers){
                EventModel.findOneAndUpdate({_id: event._id}, {$addToSet: {interviewers: {$each: interviewers}}}, {new: true}, function(err, doc){
                    if(err){console.log(err)}
                    callback(null, doc);
                });
            })
        })
    },
    addStudentToEvent: function(student, event, callback){
        EventModel.findOneAndUpdate(event, {$addToSet: {students: student}}, {new: true}, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        })
    },
    removeStudent: function(event, student, callback){
        EventModel.findOneAndUpdate({cohort: event.cohort, type: event.type},
            { $pull: {students: {fName: student.fName, lName: student.lName}}}, {new: true}, function(err, event){
                if(err){
                    console.log(err);
                } else {
                    callback(null, event);
                }
            })
    }
};

module.exports = Event;