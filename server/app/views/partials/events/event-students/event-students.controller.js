app.controller('addStudents', ['$scope', '$http', '$routeParams', 'EventFactory', function($scope, $http, $routeParams, EventFactory){
    var eventParam = $routeParams._id;
    $scope.selected = [];
    EventFactory.query({}, function(data){
        $scope.students = data[0].students;
    });

    $scope.remove = function(student){
        var i = $scope.students.indexOf(student);
        $scope.students.splice(i, 1);
        $http.post('api/event/removeStudent?_id='+ eventParam, {_id: student._id});
    }
}]);