app.controller('studentRank', ['$scope','$http', '$routeParams', function($scope, $http, $routeParams){
    var event = $routeParams._id;
    $scope.weight = {
        value: 0
    };

    $scope.interviewers = $scope.$parent.fullEvent.interviewers;
    $scope.students = $scope.$parent.fullEvent.students;
    $scope.weights = $scope.$parent.fullEvent.studentWeight;

    var getWeights = function(){
        $http.get('api/event?_id='+ event).then(function(response){
            $scope.interviewers = response.data[0].interviewers;
            $scope.students = response.data[0].students;
            $scope.weights = response.data[0].studentWeight;
        });
    };

    $scope.save = function(student, interviewer, weight){
        var weight = {
            studentName: student.fName + ' ' + student.lName,
            interviewerName: interviewer.fName + ' ' + interviewer.lName,
            studentId: student._id,
            interviewerId: interviewer._id,
            weight: weight.value || 0
        };
        $http.post('api/event/studentWeight?_id=' + event, weight)
            .then(function(response){
            $scope.weights.push(weight);
        })
    };

    $scope.remove = function(weight){
        $http.post('api/event/studentWeight/remove?_id=' + event, {
            interviewerName: weight.interviewerName,
            studentName: weight.studentName,
            weight: weight.weight
        })
            .then(function(response){
                getWeights();
            })
    }

}]);

app.controller('interviewerRank', ['$scope','$http', '$routeParams', function($scope, $http, $routeParams){
    var event = $routeParams._id;
    $scope.weight = {
        value: 0
    };

    $scope.interviewers = $scope.$parent.fullEvent.interviewers;
    $scope.weights = $scope.$parent.interviewerWeight;

    var getWeights = function(){
        $http.get('api/event?_id='+ event).then(function(response){
            $scope.interviewers = response.data[0].interviewers;
            $scope.students = response.data[0].students;
            $scope.weights = response.data[0].interviewerWeight;
        });
    };


    $scope.remove = function(weight){
        $http.post('api/event/interviewerWeight/remove?_id=' + event, {
            interviewerName: weight.interviewerName,
            studentName: weight.studentName,
            weight: weight.weight
        })
            .then(function(response){
                console.log(response);
                getWeights();
            })
    };

    $scope.save = function(interviewer, student, weight){
        $http.post('api/event/interviewerWeight?_id=' + event, {
            interviewerId: interviewer,
            studentId: student,
            weight: weight.value
        }).then(function(response){
            getWeights();
        })
    }
}]);