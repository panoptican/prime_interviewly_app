app.controller('studentRank', ['$scope','$http', '$routeParams', function($scope, $http, $routeParams){
    var event = $routeParams._id;
    $http.get('api/event?_id='+ event).then(function(response){
        console.log(response);
        $scope.interviewers = response.data[0].interviewers;
        $scope.students = response.data[0].students;
    });
    $scope.save = function(student, interviewer, weight){
        console.log(student, interviewer, weight);
        $http.post('api/student/addWeight?_id='+interviewer, {_id: student, value: weight}).then(function(repsonse){
            console.log(repsonse);
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
    $scope.save = function(interviewer, student, weight){
        $http.post('api/interviewer/addWeight?_id='+ student, {_id: interviewer, value: weight}).then(function(response){
            console.log(response);
        })
    }
}]);