app.controller('addStudents', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    $http.get('/api/student').then(function (response) {
        console.log(response);
        $scope.students = response.data;
    });
    $http.get('/api/event?_id='+$routeParams._id).then(function(response){
        var added = response.data[0].students.slice();
        var students = $scope.students;
        for(var i = 0; i < students.length; i++){
            var student = students[i];
            for(var j = 0; j < added.length; j++){
                if(student._id === added[j]._id){
                    student.added = true;
                }
            }
        }
        console.log($scope.added);
        console.log($scope.students);

    });

    var eventParam = $routeParams._id;
    $scope.eventId = eventParam;
    console.log(eventParam);
    console.log($routeParams);

    $scope.addStudent = function(id) {
        $http({
            method: 'POST',
            url: '/api/event/addStudent?_id=' + eventParam,
            data: {_id: id}
        }).then(function success(data) {
            console.log(data);
        }, function error() {
        }).then(function redirect() {
            // hide row
        });
    }
}]);