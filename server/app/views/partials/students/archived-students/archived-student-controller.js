app.controller('archStudents', ['$scope', 'StudentFactory', function($scope, StudentFactory){
    $scope.students = StudentFactory.query({isArchived: true});

    $scope.unarchive = function(id){
        StudentFactory.update({id: id}, {isArchived: false}, function(response){
            $scope.students = StudentFactory.query({isArchived: true});
        });
    }
}]);