
/*
Student dialog controller
 */
app.controller('student', ['$scope', '$mdDialog', '$http', '$rootScope', function($scope, $mdDialog, $htt, $rootScope){
    $scope.openStudents = function(ev){
        $mdDialog.show({
            controller: addStudent,
            templateUrl: 'views/partials/dialogs/student/student.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
    };
    function addStudent($scope, $mdDialog, $http, $rootScope) {
        $scope.close = function () {
            $mdDialog.hide();
        };

        $scope.submit = function(student){
            $http.post('api/student', student)
                .then(function(response){
                $rootScope.$broadcast('got/students');
                $mdDialog.hide();
            })
        };
    }

}]);