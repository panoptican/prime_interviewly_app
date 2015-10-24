app.controller('students', ['$scope', '$http', '$mdDialog', '$rootScope', function($scope, $http, $mdDialog, $rootScope){
    $scope.query = {
        order: 'name',
        limit: 50,
        page: 1
    };

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

$scope.archive = function(id){
    $http.post('api/student/archive?_id='+id, {archived: true}).then(function(response){
        $rootScope.$broadcast('gotStudents');
    })
};
}]);
app.controller('editStudent', ['$scope', '$mdDialog', 'items', function($scope, $mdDialog, items){
    $scope.student = items;

    $scope.close = function(){
        $mdDialog.hide();
    }
}]);