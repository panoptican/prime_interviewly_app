var InterviewerModel = require('../models/interviewer');

var Interviewer = {
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
    find: function(callback){
        InterviewerModel.find({}, function(err, response){
            if(err){
                console.log(err);
            } else {
                callback(null, response);
            }
        })
    }
};

module.exports = Interviewer;