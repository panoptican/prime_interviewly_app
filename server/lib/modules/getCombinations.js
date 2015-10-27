var random = require('./getRandomInt');

var combinations = {
    generate: function(interviewers, students, eventId){
        var eventId = eventId;
        var combinations = [], l = students.length, lng = l;
        while(l){
            var student = students[lng-l--], i = interviewers.length, ing = i;
            while(i){
                var interviewer = interviewers[ing-i--],
                    unavail = interviewer.unavailable,
                    eventUnavail;

                for(var prop in unavail){
                    if(prop == eventId){
                        eventUnavail = unavail[prop];
                    }
                }

                var combination = {
                    name: interviewer.fName,
                    company: interviewer.company,
                    student: student.fName + ' ' + student.lName,
                    weight: 0,
                    unavailable: eventUnavail,
                    interviewerID: interviewer._id
                };
                combinations.push(combination)
            }
        }
        return combinations;
    }
};

module.exports = combinations;