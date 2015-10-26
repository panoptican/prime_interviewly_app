app.controller('studentRank', ['$scope','$http', '$routeParams', function($scope, $http, $routeParams){
    var event = $routeParams._id;
    $http.get('api/event?_id='+ event).then(function(response){
        console.log(response);
        $scope.interviewers = response.data[0].interviewers;
        $scope.students = response.data[0].students;
    });
    $scope.save = function(id){
        $http.post('api/student').then(function(repsonse){

        })
    }

}]);

app.controller('interviewerRank', ['$scope','$http', '$routeParams', function($scope, $http, $routeParams){
    var event = $routeParams._id;
    $http.get('api/event?_id='+ event).then(function(response){
        console.log(response);
        $scope.interviewers = response.data[0].interviewers;
        $scope.students = response.data[0].students;
    });
    $scope.save = function(id){
        $http.post('api/interviewer').then(function(response){

        })
    }
}]);