app.controller('students', ['$scope', '$mdDialog', '$rootScope', 'StudentFactory', function($scope, $mdDialog, $rootScope, StudentFactory){
    $scope.selected = [];

    var getStudents = function(query){
        $scope.students = StudentFactory.query(query);
    };

    $rootScope.$on('got/students', function(){
        getStudents();
    });

    $scope.filter = {options: {debounce: 1000}};

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

    $scope.archiveSelected = function(students){
        var l = students.length;
        while(l--){
            var student = students[l];
            var i = $scope.selected.indexOf(student);
            StudentFactory.update({_id: student}, {isArchived: true});
            $scope.selected.splice(i, 1);
        }
        $rootScope.$broadcast('got/students');
    };

    $scope.archive = function(id){
        StudentFactory.update({_id: id}, {isArchived: true});
        $rootScope.$broadcast('got/students');
    };

    $scope.toggleRow = function(student) {
        var i = $scope.selected.indexOf(student._id);
        if(i === -1){
            $scope.selected.push(student._id);
            student.selected = true;
        } else {
            $scope.selected.splice(i, 1);
            student.selected = false;
        }
    };

    $scope.toggleAll = function() {
        if($scope.selected.length < $scope.students.length){
            $scope.selected = [];
            $scope.students.forEach(function(student){
                $scope.selected.push(student._id);
                student.selected = true;
            })
        } else {
            $scope.selected = [];
            $scope.students.forEach(function(student){
                student.selected = false;
            })
        }
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