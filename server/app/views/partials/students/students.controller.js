app.controller('students', ['$scope', '$http', '$mdDialog', function($scope, $http, $mdDialog){
    $scope.submit = function() {
        $http.get('/api/student').then(function (response) {
            console.log(response);
            $scope.students = response.data
        })
    };
    $scope.editStudent = function(id) {
        $http.get('/api/student?_id=' + id).then(function (response) {
            $scope.student = response.data[0];
            console.log('hello');
            $mdDialog.show({
                controller: 'editStudent',
                templateUrl: 'views/partials/dialogs/student/studentEdit.html',
                parent: angular.element(document.body),
                scope: $scope,
                clickOutsideToClose: true
            })
        })
    };
}]);
app.controller('editStudent', ['$scope', '$mdDialog', function($scope, $mdDialog){
    $scope.close = function(){
        $mdDialog.hide();
    }
}]);