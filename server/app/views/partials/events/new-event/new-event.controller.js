
/*
 New event controller
  */
app.controller('newEventCtrl', ['$scope', '$http', '$location', '$filter', function($scope, $http, $location, $filter) {
    $scope.submit = function() {

        var event = {
            type: $scope.eventType,
            cohort: $scope.cohort,
            date: $scope.date,
            location: $scope.location,
            startTime: $filter('date')(new Date($scope.sTime), 'HH:mm'),
            endTime: $filter('date')(new Date($scope.eTime), 'HH:mm'),
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