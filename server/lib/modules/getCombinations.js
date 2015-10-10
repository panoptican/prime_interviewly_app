var random = require('./getRandomInt');

var combinations = {
    generate: function(interviewers, students){
        var combinations = [];
        for(var i = 0; i < students.length; i++){
            interviewers.forEach(function(interviewer){
                combinations.push({
                    name: interviewer.name,
                    company: interviewer.company,
                    student: students[i].name,
                    weight: random.between(-2, 2),
                    unavailable: interviewer.unavailable,
                    interviewerID: interviewer.id
                })
            })
        }
        return combinations;
    }
};

module.exports = combinations;