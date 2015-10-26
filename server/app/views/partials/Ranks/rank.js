app.controller('studentRank', ['$scope','$http', function($scope, $http){
    var event = $routeParams._id;
    $http.get('/events?_id='+ event).then(function(response){
        $scope.interviewers = response.data.interviewers;
        $scope.students = response.data.students;
    })


}]);

app.controller('interviewerRank', ['$scope','$http', function($scope, $http){
    var event = $routeParams._id;
    $http.get('/events?_id='+ event).then(function(response){
        $scope.interviewers = response.data.interviewers;
        $scope.students = response.data.students;
    })
}]);