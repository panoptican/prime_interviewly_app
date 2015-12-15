app.controller('ArchInterviewers', ['$scope', 'InterviewerFactory', function($scope, InterviewerFactory){
    $scope.selected = [];
    $scope.interviewers = InterviewerFactory.query({isArchived: true});

    $scope.cancelSelected = function() {
        $scope.selected = [];
    };

    $scope.unarchive = function(id){
        unarchive(interviewer);
    };

    function unarchive(interviewer){
        StudentFactory.update({id: interviewer._id}, {isArchived: false});
        var i = $scope.interviewers.indexOf(interviewer);
        $scope.interviewers.splice(i, 1);
    }
}]);