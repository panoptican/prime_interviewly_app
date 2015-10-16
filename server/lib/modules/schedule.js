var shuffle = require('./shuffle');
var sort = require('./sortByNum');

var scheduler = {
    fillGaps: function(scheduled, interviewSlots){
        while(interviewSlots){
            if(!scheduled['slot' + interviewSlots]){
                scheduled['slot' + interviewSlots] = 'Break';
            }
            interviewSlots--;
        }
        return scheduled;
    },
    sortKeys: function(object){
            var temporary = object;
            var sorted = {};
            Object.getOwnPropertyNames(temporary).sort().forEach((elem) => sorted[elem] = temporary[elem]);
            return sorted;
    },
    //this populates an array with the required interview slots and randomizes the order
    getSlots: function(interviewSlots){
        var array = [], i=1;
        while(interviewSlots--){
            array.push(i);
            i++;
        }
        array = shuffle.get(array);
        return array;
    },
    //returns true if count of all student interviews are equal
    check: function(students, interviewTarget){
        var counts = [];
        students.forEach((student) => {
            counts.push(student.scheduled.count.total);
        });
        console.log(counts);
        for(var i = 0; i < counts.length; i++){
            if(counts[i] !== interviewTarget){
                return false;
            }
        }
        return true;
    },
    //calculates maximum possible interviews
    maxPossibleInterviews: function(interviewSlots, students, interviewers){
        var slotsUnavailable = 0;
        interviewers.forEach((interview) => {
            slotsUnavailable += Object.keys(interview.unavailable).length;
        });
        return (interviewSlots * students.length) - slotsUnavailable;
    },
    //matches interviews
    match: function(interviewSlots, interviewers, students, combinations, interviewMax, companyMax){

        var initCombinations = combinations.slice(),
            initInterviewers = interviewers.slice(),
            initStudents = students.slice(),
            currentStudents = shuffle.get(students),
            interviewers = shuffle.get(interviewers),
            sortedCombinations = sort.high(combinations),
            schedule = [],
            shifter = 0,
            slots = scheduler.getSlots(interviewSlots);

        //this function updates the student and interviewer objects to reflect the interviews scheduled
        var book = (student, interviewer, match) => {
            student.scheduled.count.total = 1 + (student.scheduled.count.total || 0);
            student.scheduled.count[match.company] = 1 + (student.scheduled.count[match.company] || 0);
            student.scheduled.with[match.interviewerID] = true;
            interviewer.scheduled['slot' + currentSlot] = student.name;
        }
        //this function updates the student and interviewer objects to schedule a break
        var scheduleBreak = (student, interviewer, currentSlot) => {
            student.scheduled.count.break = 1 + (student.scheduled.count.break || 0);
            interviewer.scheduled['slot' + currentSlot] = "Break";
            interviewer.breaks += 1;
        }

        //iterate through interview slots
        while(slots.length){
            var currentSlot = slots[0];
            // for each interviewer, iterate through all possible combinations
            interviewers.forEach((interviewer, i) => {
                sortedCombinations.some((interview, k) => {
                    var student = currentStudents[(i + shifter) % students.length], lastCompany;

                    //checks to see the last company that student interviewed with
                    schedule.forEach((interview) => {
                       if(interview.slot == currentSlot - 1 && interview.student == student.name){
                           lastCompany = interview.company;
                       }
                        return lastCompany;
                    })

                    //if interview ID matches the current interviewer AND interview student matches current student AND interview is available AND student has less than max interviews AND student has not interviewed with this person before AND the last interview was not with this company
                if( interview.interviewerID == interviewer.id &&
                    interview.student == student.name &&
                    !interview.unavailable['slot' + currentSlot] &&
                    student.scheduled.count.total < interviewMax &&
                    !student.scheduled.with[interview.interviewerID] &&
                    interview.company !== lastCompany
                     ){
                        var match = interview;
                        match.slot = currentSlot;

                        //if student has no previous matches with this company, book interview
                        if(!student.scheduled.count[interview.company]){
                            book(student, interviewer, match);
                            sortedCombinations.splice(k, 1);
                            schedule.push(match);
                            return true;
                        }
                        //if student has no breaks AND interviewer has no breaks AND interviewer is not single
                        else if(!student.scheduled.count.break && interviewer.breaks < 1 && interviewer.single == false){
                            var match = {
                                name: interviewer.name,
                                company: interviewer.company,
                                student: "Break",
                                interviewerID: interviewer.id,
                                slot: currentSlot
                            };
                            scheduleBreak(student, interviewer, currentSlot);
                            sortedCombinations.splice(k, 1);
                            schedule.push(match);
                            return true;
                        }
                        //if student has less than companyMax with this company, book interview
                        else if(student.scheduled.count[interview.company] < companyMax){
                            book(student, interviewer, match);
                            sortedCombinations.splice(k, 1);
                            schedule.push(match);
                            return true;
                        }
                        else {
                            var match = {
                                name: interviewer.name,
                                company: interviewer.company,
                                student: "Break - No Match",
                                interviewerID: interviewer.id,
                                slot: currentSlot
                            };
                            scheduleBreak(student, interviewer, currentSlot);
                            schedule.push(match);
                            return true;
                        }
                    }
                })
            })
            shifter++;
            slots.splice(0, 1);
        }

        if(scheduler.check(students, interviewMax)){
            interviewers.forEach(function(interviewer){
                interviewer.scheduled = scheduler.fillGaps(interviewer.scheduled, interviewSlots);
                interviewer.scheduled = scheduler.sortKeys(interviewer.scheduled);
            });
            return {schedule: schedule, students: students, interviewer: interviewers};
        } else {
            initStudents.forEach((student) => {
                student.scheduled.with = {};
                student.scheduled.count = {total: 0};
            })
            initInterviewers.forEach((interviewer) => {
                interviewer.scheduled = {};
                interviewer.breaks = 0;
            })
            return this.match(interviewSlots, initInterviewers, initStudents, initCombinations, interviewMax, companyMax);
        }
    }
};

module.exports = scheduler;