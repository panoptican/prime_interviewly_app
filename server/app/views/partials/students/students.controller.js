app.controller('students', ['$scope', '$http', '$mdDialog', '$rootScope', function($scope, $http, $mdDialog, $rootScope){
    $http.get('/api/student').then(function (response) {
        $scope.students = response.data
    });

    $rootScope.$on('gotStudents', function(){
        $http.get('/api/student').then(function (response) {
            $scope.students = response.data
        });
    });

    $scope.editStudent = function(id) {
        $http.get('/api/student?_id=' + id).then(function (response) {
            $scope.student = response.data[0];
            console.log('hello');
            $mdDialog.show({
                controller: 'editStudent',
                locals: {
                    items: $scope.student
                },
                templateUrl: 'views/partials/dialogs/student/studentEdit.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            })
        })
    };
}]);
app.controller('editStudent', ['$scope', '$mdDialog', 'items', function($scope, $mdDialog, items){
    $scope.student = items;

    $scope.close = function(){
        $mdDialog.hide();
    }
}]);