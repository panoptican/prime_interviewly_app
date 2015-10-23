app.controller('addInterviewer', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){

    $http.get('/api/interviewer').then(function (response) {
        console.log(response);
        $scope.interviewers = response.data;
    });

    var eventParam = $routeParams._id;
    $scope.eventId = eventParam;
    console.log(eventParam);

    $scope.addInterviewer = function(id) {
        $http({
            method: 'POST',
            url: '/api/event/addInterviewer?_id=' + eventParam,
            data: {_id: id}
        }).then(function success(data) {
            console.log(data);
        }, function error() {
        }).then(function redirect() {
            // hide row
        });
    }
}]);