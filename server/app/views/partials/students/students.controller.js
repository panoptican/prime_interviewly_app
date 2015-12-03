app.controller('students', ['$scope', '$mdDialog', '$rootScope', 'StudentFactory', function($scope, $mdDialog, $rootScope, StudentFactory){
    $scope.students = StudentFactory.query();

    $rootScope.$on('got/students', function(){
        $scope.students = StudentFactory.query();
    });

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

    $scope.editStudent = function(id) {
        $scope.student = StudentFactory.get({id: id});
        $mdDialog.show({
            controller: 'editStudent',
            locals: {
                items: $scope.student
            },
            templateUrl: 'views/partials/dialogs/student/studentEdit.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    };

    $scope.archive = function(id){
        StudentFactory.update({_id: id}, {isArchived: true});
        $rootScope.$broadcast('got/students');
    };
}]);

app.controller('editStudent', ['$scope', '$mdDialog', 'items', '$rootScope', 'StudentFactory', function($scope, $mdDialog, items, $rootScope, StudentFactory){
    $scope.student = items;

    $scope.edit = function(student){
        StudentFactory.update({_id: student._id}, student);
        $rootScope.$broadcast('got/students');
        $mdDialog.hide();
    };

    $scope.close = function(){
        $mdDialog.hide();
    }
}]);