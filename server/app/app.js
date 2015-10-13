var app = angular.module('app', ['ngMaterial', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider.
    when('/', {
            templateUrl: 'views/partials/login.html'
        }).
    when('/home', {
            templateUrl: 'views/partials/home.html'
        }).
    otherwise({
            redirectTo: '/home'
        })
}]);

app.controller('student', ['$scope', '$mdDialog', function($scope,$mdDialog ){
    $scope.openStudents = function(ev){
        console.log('hello');
        $mdDialog.show({
            controller: addStudent,
            templateUrl: 'views/partials/studentDialogue.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
    };
    function addStudent($scope, $mdDialog) {
        $scope.companies = [
            {name: 'Prime'},
            {name: 'Nerdery'},
            {name: 'Digital People'}
        ];
        $scope.events = [
            {name: 'mocks Delta'},
            {name: 'career Delta'},
            {name: 'mocks Epsilon'}
        ]
    }

}]);