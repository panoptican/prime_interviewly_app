
/*
 New event controller
  */
app.controller('newEventCtrl', ['$scope', '$http', '$location', '$filter', function($scope, $http, $location, $filter) {
    $scope.submit = function() {

        console.log($filter('date')(new Date($scope.sTime), 'h:mm'));

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