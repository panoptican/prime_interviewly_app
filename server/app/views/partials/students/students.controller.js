app.controller('students', ['$scope', '$mdDialog', '$rootScope', 'StudentFactory', function($scope, $mdDialog, $rootScope, StudentFactory){
    var getStudents = function(query){
        $scope.students = StudentFactory.query(query);
    };

    $rootScope.$on('got/students', function(){
        getStudents();
    });

    $scope.filter = {
        options: {
            debounce: 1000
        }
    };

    $scope.search = function(query){
        getStudents(query);
    };

    $scope.removeFilter = function () {
        $scope.filter.show = false;
        getStudents();
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

    getStudents();
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