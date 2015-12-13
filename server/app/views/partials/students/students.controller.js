app.controller('students', ['$scope', '$mdDialog', '$rootScope', 'StudentFactory', '$filter', function($scope, $mdDialog, $rootScope, StudentFactory, $filter){
    'use strict';
    $scope.selected = [];
    $scope.query = {
        filter: '',
        order: 'fName'
    };
    $scope.selectAll = false;
    $scope.filtered = [];

    //GET all students
    var getStudents = function(query){
        $scope.students = StudentFactory.query(query, function(response){
            $scope.filtered = $scope.students.slice();
        });
    };

    getStudents();

    // filter students depending on search input
    $scope.$watch('query.filter.$', function(newValue, oldValue) {
        if(newValue || oldValue){
            $scope.filtered = $filter('filter')($scope.students, $scope.query.filter);
        }
    });

    $rootScope.$on('got/students', function(){
        getStudents();
    });

    // clear search field and remove filter toolbar view
    $scope.removeFilter = function () {
        $scope.query.filter = '';
        $scope.filter.show = false;
        $scope.selectAll = false;
    };

    // clear filter and cancel any selected items
    $scope.cancelSelected = function() {
        $scope.selected = [];
        $scope.query.filter = '';
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
        $scope.removeFilter();
    };

    // archive a single student
    $scope.archive = function(student){
        archiveStudent(student);
    };

    function archiveStudent(student){
        StudentFactory.update({_id: student._id}, {isArchived: true});
        var i = $scope.filtered.indexOf(student);
        var j = $scope.students.indexOf(student);
        $scope.students.splice(j, 1);
        $scope.filtered.splice(i, 1);
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