
/*
 View events controller
 */
app.controller('viewEventCtrl', ['$scope', '$http', '$filter', '$routeParams', function($scope, $http, $filter, $routeParams) {

    var eventParam = $routeParams._id;
    $scope.eventId = eventParam;

    $http.get('/api/event?_id=' + eventParam).then(function success(response) {

        $scope.eventTitle = response.data[0].cohort + ' ' + response.data[0].type;
        $scope.eventDate = $filter('date')(new Date(response.data[0].date), 'MM/dd/yy');
        $scope.eventStime = response.data[0].startTime;
        $scope.eventEtime = response.data[0].endTime;
        $scope.eventDur = response.data[0].interviewDuration;
        $scope.eventLoc = typeof response.data[0].location != 'undefined' ? response.data[0].location : 'NA';
        $scope.eventOrg = typeof response.data[0].organizer != 'undefined' ? response.data[0].organizer : 'NA';

    }, function error() {});

}]);