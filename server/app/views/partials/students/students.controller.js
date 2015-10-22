app.controller('students', ['$scope', '$http', '$mdDialog', function($scope, $http, $mdDialog){
    $scope.submit = function() {
        $http.get('/api/student').then(function (response) {
            console.log(response);
            $scope.students = response.data
        })
    };
    $scope.editStudent = function(ev, id) {
        $http.get('/api/student?_id=' + id).then(function (response) {
            $mdDialog.show({
                controller: editStudent(response),
                templateUrl: 'views/partials/dialogs/student/studentEdit.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
        })
    };
        function editStudent(response){
            console.log(response);
            var info = response.data[0];
            $scope.student = {
            fname: info.fName,
            lname: info.lName,
            email: info.email,
            cohort: info.cohort
        };
            console.log($scope.student);
    }
}]);