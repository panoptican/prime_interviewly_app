var random = require('./getRandomInt');

var combinations = {
    generate: function(interviewers, students){
        var combinations = [], l = students.length, lng = l;
        while(l){
            var student = students[lng-l--], i = interviewers.length, ing = i;
            while(i){
                var interviewer = interviewers[ing-i--];
                combinations.push({
                    name: interviewer.fName,
                    company: interviewer.company,
                    student: student.fName,
                    weight: random.between(-2, 2),
                    unavailable: interviewer.unavailable,
                    interviewerID: interviewer._id
                })
            }
        }
        return combinations;
    }
};

module.exports = combinations;