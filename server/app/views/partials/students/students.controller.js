app.controller('students', ['$scope', '$mdDialog', '$rootScope', 'StudentFactory', '$filter', function($scope, $mdDialog, $rootScope, StudentFactory, $filter){
    $scope.selected = [];
    $scope.selectAll = false;
    $scope.filtered = [];
    $scope.search = {$: ''};

    //GET all students
    var getStudents = function(query){
        $scope.students = StudentFactory.query(query);
    };

    getStudents();

    // filter students depending on search input
    $scope.$watch('search.$', function(newValue, oldValue) {
        if(newValue || oldValue){
            $scope.filtered = $filter('filter')($scope.students, $scope.search);
        }
    });

    $rootScope.$on('got/students', function(){
        getStudents();
    });

    // clear search field and remove filter toolbar view
    $scope.removeFilter = function () {
        $scope.search.$ = '';
        $scope.filter.show = false;
        $scope.selectAll = false;
    };

    // clear filter and cancel any selected items
    $scope.cancelSelected = function() {
        $scope.selected = [];
        $scope.search.$ = '';
        $scope.students.forEach(function(student){
            student.selected = false;
        });
        $scope.selectAll = false;
    };

    // edit student
    $scope.editStudent = function(id) {
        $scope.student = StudentFactory.get({id: id});
        $mdDialog.show({
            controller: 'editStudent',
            locals: {items: $scope.student},
            templateUrl: 'views/partials/dialogs/student/studentEdit.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    };

    // archive a group of students
    $scope.archiveSelected = function(students){
        var l = students.length;
        while(l--){
            var student = students[l];
            archiveStudent(student);
            var i = $scope.selected.indexOf(student);
            $scope.selected.splice(i, 1);
        }
    };

    // archive a single student
    $scope.archive = function(student){
        archiveStudent(student);
    };

    // toggle a selected student
    $scope.toggleRow = function(student) {
        var i = $scope.selected.indexOf(student);
        if(i === -1){
            $scope.selected.push(student);
            student.selected = true;
        } else {
            $scope.selected.splice(i, 1);
            student.selected = false;
        }
        $scope.selectAll = false;
    };

    // toggle all students
    $scope.toggleAll = function(students) {
        if($scope.selected.length == students.length ||
            $scope.selected.length == $scope.filtered.length &&
            $scope.filtered.length > 0){
            $scope.selected = [];
            $scope.students.forEach(function(student){
                student.selected = false;
            });
        } else if ($scope.filtered.length > 0) {
            $scope.selected = $scope.filtered.slice();
            $scope.filtered.forEach(function(student){
                student.selected = true;
            });
        } else {
            $scope.selected = $scope.students.slice();
            $scope.students.forEach(function(student){
                student.selected = true;
            });
        }
    };

    function archiveStudent(student){
        StudentFactory.update({_id: student._id}, {isArchived: true});
        var i = $scope.students.indexOf(student);
        $scope.students.splice(i, 1);
    }
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