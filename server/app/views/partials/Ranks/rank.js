app.controller('studentRank', ['$scope','$http', '$routeParams', function($scope, $http, $routeParams){
    var event = $routeParams._id;

    $http.get('api/event?_id='+ event).then(function(response){
        $scope.interviewers = response.data[0].interviewers;
        $scope.students = response.data[0].students;
    });

    $scope.save = function(student, interviewer, weight){
        $http.post('api/event/studentWeight?_id=' + event, {
            studentId: student,
            interviewerId: interviewer,
            weight: weight
        }).then(function(response){
            console.log(response);
        })
    }

}]);

app.controller('interviewerRank', ['$scope','$http', '$routeParams', function($scope, $http, $routeParams){
    var event = $routeParams._id;

    $http.get('api/event?_id='+ event).then(function(response){
        $scope.interviewers = response.data[0].interviewers;
        $scope.students = response.data[0].students;
    });

    $scope.save = function(interviewer, student, weight){
        $http.post('api/event/interviewerWeight?_id=' + event, {
            interviewerId: interviewer,
            studentId: student,
            value: weight
        }).then(function(response){
            console.log(response);
        })
    }
}]);