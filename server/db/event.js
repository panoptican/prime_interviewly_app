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
        Interviewers.find({fName: interviewer.fName, company: interviewer.company}, '_id', function(err, interviewer){
            if(err){
                console.log(err);
            } else {
                if(interviewer){
                    EventModel.findOneAndUpdate({cohort: event.cohort, type: event.type}, {$push: {interviewers: interviewer}}, {new: true}, function(err, doc){
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
    removeInterviewer: function(event, interviewerQuery, callback){
        EventModel.findOne({cohort: event.cohort, type: event.type}, function(err, event){
            if(Object.keys(interviewerQuery).length > 0 && event){
                event.interviewers.some(function(interviewer, index){
                    if(interviewerQuery.id == interviewer){
                        event.interviewers.splice(index, 1);
                        return true;
                    }
                });
                EventModel.update({_id: event._id}, {$set : { interviewers: event.interviewers }}, function(err, update){
                    if(err){console.log(err)}
                    else if (update.nModified == 1){
                        callback(null, 'Removed interviewer ' + interviewerQuery.id);
                    } else {
                        callback(null, 'No interviewer found with that ID.');
                    }
                })
            }
        })
    },
    addBulkStudents: function(event, callback){
        EventModel.findOne({cohort: event.cohort, type: event.type}, function(err, event){
            Students.findCohort({cohort: event.cohort}, '_id', function(err, students){
                EventModel.findOneAndUpdate({_id: event._id}, {$addToSet: {students: {$each: students}}}, {new: true}, function(err, doc){
                    if(err){console.log(err)}
                    callback(null, doc);
                });
            });
        });
    },
    addBulkInterviewers: function(event, callback){
        EventModel.findOne({cohort: event.cohort, type: event.type}, function(err, event){
            Interviewers.findMany({}, '_id', function(err, interviewers){
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
    removeStudent: function(eventQuery, studentQuery, callback){
        EventModel.findOne({cohort: eventQuery.cohort, type: eventQuery.type}, function(err, event){
            console.log(event);
            if(Object.keys(studentQuery).length > 0 && event){
                event.students.some(function(student, index){
                    if(studentQuery.id == student){
                        event.students.splice(index, 1);
                        return true;
                    }
                });
                EventModel.update({_id: event._id}, {$set : { students: event.students }}, function(err, update){
                    if(err){console.log(err)}
                    else if (update.nModified == 1){
                        callback(null, 'Removed student ' + studentQuery.id);
                    } else {
                        callback(null, 'No student found with that ID.');
                    }
                })
            }
        })
    }
};

module.exports = Event;