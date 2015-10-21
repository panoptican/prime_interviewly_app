
// Student dialog controller
app.controller('student', ['$scope', '$mdDialog', function($scope,$mdDialog){
    $scope.openStudents = function(ev){
        $mdDialog.show({
            controller: addStudent,
            templateUrl: 'views/partials/dialogs/student/student.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
    };
    function addStudent($scope) {
        $scope.close = function () {
            $mdDialog.hide();
            $scope.companies = [
                {name: 'Prime'},
                {name: 'Nerdery'},
                {name: 'Digital People'}
            ];
            $scope.events = [
                {name: 'mocks Delta'},
                {name: 'career Delta'},
                {name: 'mocks Epsilon'}
            ];
        };
        $scope.submit = function(fname, lname, email, cohort){
            var student = {
                fname: fname,
                lname: lname,
                email: email,
                cohort: cohort
            };
            console.log(student);
        }
    }

}]);