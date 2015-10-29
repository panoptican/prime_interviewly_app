app.controller('addStudents', ['$scope', '$http', '$routeParams', '$rootScope', function($scope, $http, $routeParams, $rootScope){

    $http.get('/api/student').then(function (response) {
        $scope.students = response.data
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
    });

    var eventParam = $routeParams._id;
    $scope.eventId = eventParam;

    $scope.addStudent = function(id) {
        $http({
            method: 'POST',
            url: '/api/event/addStudent?_id=' + eventParam,
            data: {_id: id}
        }).then(function success(response) {
            $rootScope.$broadcast('eventStudents');
            var added = response.data.students.slice();
            var students = $scope.students;
            for(var i = 0; i < students.length; i++){
                var student = students[i];
                for(var j = 0; j < added.length; j++){
                    if(student._id === added[j]._id){
                        student.added = true;
                    }
                }
            }
        }, function error() {
        }).then(function hideRow() {
            // hide row
        });
    };
    $scope.remove = function(id){
        var students = $scope.students;
        for(var i=0; i <students.length; i++){
            var student = students[i];
            if(student._id === id){
                student.added = false;
            }
        }
        var event = $routeParams._id;
        $http.post('api/event/removeStudent?_id='+event, {_id: id}).then(function(response){
            $rootScope.$broadcast('eventStudents');
        })
    }
}]);