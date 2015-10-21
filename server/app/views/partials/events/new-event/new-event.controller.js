
/*
 New event controller
  */
app.controller('newEventCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.submit = function() {

        var event = {
            type: $scope.eventType,
            cohort: $scope.cohort,
            date: $scope.date,
            location: $scope.location,
            startTime: $scope.sTime,
            endTime: $scope.eTime,
            interviewDuration: $scope.slotDur,
            organizer: $scope.organizer
        };

        $http({
            method: 'POST',
            url: 'api/event',
            data: event
        }).then(function success(data) {
            console.log(data);
        }, function error() {}).then(function redirect() {
            $location.path('/events')
        })
    }
}]);