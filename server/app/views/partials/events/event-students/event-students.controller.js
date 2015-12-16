app.controller('addStudents', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    var eventParam = $routeParams._id;

    $scope.selected = [];

    $scope.students = $scope.$parent.fullEvent.students;

    $scope.remove = function(student){
        var i = $scope.students.indexOf(student);
        $scope.students.splice(i, 1);
        $http.post('api/removeStudent?_id='+ eventParam, {_id: student._id});
    }
}]);