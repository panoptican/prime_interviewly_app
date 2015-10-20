var EventModel = require('../models/Event');
var Interviewers = require('../db/interviewer');
var Students = require('../db/student')

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
    addInterviewer: function(interviewerQuery, eventQuery, interviewer, callback){
        Interviewers.findOne(interviewerQuery, function(err, interviewer){
            EventModel.findOneAndUpdate(query, {$push: {interviewers: interviewer._id}}, {new: true}, function(err, doc){
                if(err){
                    console.log(err);
                } else {
                    callback(null, doc);
                }
            })
        });
    },
    addStudentsBulk: function(cohortQuery, eventQuery, callback){
        EventModel.findOne(eventQuery, function(err, event){
            if(event.students.length == 0){
                Students.find(cohortQuery, function(err, students){
                    students.forEach(function(student){
                        Event.addStudentToEvent(student, eventQuery, function(err, doc){
                            if (err) {console.log(err)}
                        })
                    });
                    callback(null, students);
                });
            }
        });
    },
    addStudentToEvent: function(student, event, callback){
        EventModel.findOneAndUpdate(event, {$push: {students: student._id}}, {new: true}, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        })
    },
    removeStudent: function(eventQuery, studentQuery, callback){
        EventModel.findOne(eventQuery, function(err, event){
            if(Object.keys(studentQuery).length > 0){
                var students = event.students;
                students.some(function(student, index){
                    if(studentQuery._id == student._id){
                        students.splice(index, 1);
                        return true;
                    }
                });
                EventModel.update({_id: event.id}, {$set : { students: students }}, {new: true}, function(err, doc){
                    if(err){console.log(err)}
                    callback(null, doc);
                })
            }
        })
    }
};

module.exports = Event;