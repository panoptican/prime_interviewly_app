var shuffle = require('./shuffle');
var sort = require('./sortByNum');
var findMatching = require('bipartite-matching');

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
    //matches interviews
    match: function(interviewSlots, interviewers, students, eventId){
        interviewers = shuffle.get(interviewers);
        students = shuffle.get(students);
        var slots = scheduler.getSlots(interviewSlots);
        var l = slots.length;
        var schedule = {};
        var counter = {};
        var graph = [];

        // create a bipartite graph of all possible interview matches
        interviewers.forEach(function(interviewer, index){
            for(var n = 0; n < students.length; n++) {
                var match = [index, n];
                graph.push(match);
            }
        });

        // while there are interview slots to schedule...
        while(l--){
            var currentSlot = slots[0];

            // find the maximum matching in graph
            var slotSchedule = findMatching(interviewers.length, students.length, graph);
            schedule['slot' + currentSlot] = slotSchedule;

            // and remove the selected matches from the graph
            slotSchedule.forEach(function(match){
                // increment interview counts for student and interviewer
                //counter.students[match[1]] = counter.students[match[1]] + 1 || 1;
                //counter.interviewers[match[0]] = counter.interviewers[match[0]] + 1 || 1;

                graph.forEach(function(edge, index){
                    if(edge[0] === match[0] && edge[1] === match[1]){
                        graph.splice(index, 1);
                    }
                });
            });
            slots.splice(0, 1);
        }

        // replace the index numbers in the graph schedule with student data
        interviewers.forEach(function(interviewer, index){
            for(slot in schedule){
                schedule[slot].forEach(function(match){
                    if(match[0] === index){
                        studentIndex = match[1];
                        interviewer.scheduled[slot] = students[studentIndex].fName + ' ' + students[studentIndex].lName;
                    }
                });
            }
        });

        return {interviewer: interviewers};
    }
};



module.exports = scheduler;