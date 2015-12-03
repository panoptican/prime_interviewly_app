app.controller('archStudents', ['$scope', 'StudentFactory', function($scope, StudentFactory){
    $scope.students = StudentFactory.query({isArchived: true});

    $scope.unarchive = function(id){
        StudentFactory.update({_id: id}, {isArchived: false});
        $scope.students = StudentFactory.query({isArchived: true});
    }
}]);