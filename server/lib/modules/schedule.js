var shuffle = require('./shuffle');
var sort = require('./sortByNum');

var counter = 0;

var scheduler = {
    //this fills in 'break' where there were no possible scheduled interviews
    fillGaps: function(scheduled, interviewSlots){
        while(interviewSlots){
            if(!scheduled['slot' + interviewSlots]){
                scheduled['slot' + interviewSlots] = 'Break';
            }
            interviewSlots--;
        }
        return scheduled;
    },
    //this sorts the slot times in numerical order
    sortKeys: function(object){
            var temporary = object, sorted = {};
        Object.getOwnPropertyNames(temporary)
            .sort((a,b) => a < b ? 1 : a > b ? -1 : 0)
            .forEach((elem) => sorted[elem] = temporary[elem]);
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
    //returns true if count of all student interviews are within 1 of interviewTarget
    check: function(students, interviewTarget){
        var counts = [], studentL = students.length, lng = studentL;
        while(studentL){
            var student = students[lng-studentL--];
            counts.push(student.scheduled.count.total);
        }
        console.log(counts);
        var c = counts.length, cng = c;
        while(c){
            if(counts[cng-c--] < interviewTarget - 1){
                return false;
            }
        }
        return true;
    },
    //matches interviews
    match: function(interviewSlots, interviewers, students, combinations, interviewMax, companyMax, eventId){

        var initCombinations = combinations.slice(),
            initInterviewers = interviewers.slice(),
            initStudents = students.slice(),
            currentStudents = shuffle.get(students),
            interviewers = shuffle.get(interviewers),
            sortedCombinations = sort.high(combinations),
            schedule = [],
            shifter = 0,
            slots = scheduler.getSlots(interviewSlots),
            l = slots.length,
            lng = l,
            m = interviewers.length;

        //this function updates the student and interviewer objects to reflect the interviews scheduled
        var book = (student, interviewer, match) => {
            student.scheduled.count.total = 1 + (student.scheduled.count.total || 0);
            student.scheduled.count[match.company] = 1 + (student.scheduled.count[match.company] || 0);
            student.scheduled.with[match.interviewerID] = true;
            interviewer.scheduled['slot' + currentSlot] = student.fName + ' ' + student.lName;
        }
        //this function updates the student and interviewer objects to schedule a break
        var scheduleBreak = (student, interviewer, currentSlot) => {
            student.scheduled.count.break = 1 + (student.scheduled.count.break || 0);
            interviewer.scheduled['slot' + currentSlot] = "Break";
            interviewer.breaks += 1;
        }

        //iterate through interview slots
        while(l--){
            var currentSlot = slots[0];
            // for each interviewer, iterate through all possible combinations
            interviewers.forEach((interviewer, i) => {
                sortedCombinations.some((interview, k) => {
                    var student = currentStudents[(i + shifter) % students.length];
                    //if interview ID matches the current interviewer AND interview student matches current student AND interview is available AND student has less than max interviews AND student has not interviewed with this person before AND the last interview was not with this company
                if( interview.interviewerID == interviewer._id &&
                    interview.student == student.fName + ' ' + student.lName &&
                    !interview.unavailable['slot' + currentSlot] &&
                    student.scheduled.count.total < interviewMax &&
                    !student.scheduled.with[interview.interviewerID]
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
                        else if(!student.scheduled.count.break && interviewer.breaks < 1 && !interviewer.single){
                            var match = {
                                name: interviewer.fName,
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
                                name: interviewer.fName,
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

        //check to see if each student has interviewMax, if so, then sort slots and return, if not run scheduler.match again
        if(scheduler.check(students, interviewMax)){
            var lng = m;
            while(m){
                var interviewer = interviewers[lng-m--];
                interviewer.scheduled = scheduler.fillGaps(interviewer.scheduled, interviewSlots);
                interviewer.scheduled = scheduler.sortKeys(interviewer.scheduled);
            }
            counter = 0;
            return {interviewer: interviewers};
        } else {
            var l = initStudents.length, m = initInterviewers.length, lng = l, lng2 = m;
            while(l){
                var student = students[lng-l--];
                student.scheduled.with = {};
                student.scheduled.count = {total: 0};
            }
            while(m){
                var interviewer = interviewers[lng2-m--];
                interviewer.scheduled = {};
                interviewer.breaks = 0;
            }
            counter++;
            //if no matches can be found after 10 tries, decrement interviewMax
            if(counter > 10){
                counter = 0;
                interviewMax--;
            }

            return this.match(interviewSlots, initInterviewers, initStudents, initCombinations, interviewMax, companyMax);
        }
    }
};

module.exports = scheduler;