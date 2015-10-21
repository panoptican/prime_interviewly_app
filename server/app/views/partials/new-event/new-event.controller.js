
// New event controller
app.controller('newEventCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.submit = function(evtype, date, title, location, sTime, eTime, slotDur, description, organizer){
        var event = {
            eventType: evtype,
            date: date,
            title: title,
            location: location,
            sTime: sTime,
            eTime: eTime,
            slotDur: slotDur,
            description: description,
            organizer: organizer
        };
        console.log(event);
    }
}]);