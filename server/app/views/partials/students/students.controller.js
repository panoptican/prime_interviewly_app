app.controller('students', ['$scope', '$http', '$mdDialog', '$rootScope', function($scope, $http, $mdDialog, $rootScope){
    $scope.query = {
        order: 'name',
        limit: 50,
        page: 1
    };

    $scope.filter = {
        options: {
            debounce: 500
        }
    };

    $scope.removeFilter = function () {
        $scope.filter.show = false;
        $scope.query.filter = '';

        if($scope.filter.form.$dirty) {
            $scope.filter.form.$setPristine();
        }
    };

    $http.get('/api/student').then(function (response) {
        $scope.students = response.data
    });

    $rootScope.$on('got/students', function(){
        $http.get('/api/student').then(function (response) {
            $scope.students = response.data
        });
    });

    $scope.editStudent = function(id) {
        $http.get('/api/student?_id=' + id).then(function (response) {
            $scope.student = response.data[0];
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
    $http.post('api/student/archive?_id='+id, {isArchived: true}).then(function(response){
        $rootScope.$broadcast('got/students');
    })
};
}]);
app.controller('editStudent', ['$scope', '$mdDialog', 'items', '$http', '$rootScope', function($scope, $mdDialog, items, $http, $rootScope){
    $scope.student = items;

    $scope.edit = function(student){
        $http.put('api/student?_id=' + student._id, student)
            .then(function(response){
                $rootScope.$broadcast('got/students');
                $mdDialog.hide();

            });
    };

    $scope.close = function(){
        $mdDialog.hide();
    }
}]);