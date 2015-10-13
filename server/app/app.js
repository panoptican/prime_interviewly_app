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
    when('/events', {
        templateUrl: 'views/partials/events/events.html'
    }).
    when('/students', {
            templateUrl: 'views/partials/students/students.html'
    }).
    when('/interviewers', {
            templateUrl: 'views/partials/interviewers/interviewers.html'
        }).

    when('/archived-events', {
            templateUrl: 'views/partials/archivedEvents/archivedEvents.html'
        }).

    when('/account', {
            templateUrl: 'views/partials/account/account.html'
        }).

    when('/logout', {
            templateUrl: 'views/partials/logout/logout.html'
        }).
    otherwise({
            redirectTo: '/index'
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