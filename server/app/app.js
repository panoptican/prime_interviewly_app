var app = angular.module('app', ['ngMaterial', 'ngRoute', 'ngMessages', 'ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.exporter', 'ngFileUpload']);

/*
 Angular configuration
 */
app.config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function($routeProvider, $locationProvider, $mdThemingProvider){

    // Color palette
    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('orange');

    // HTML5 mode
    $locationProvider.html5Mode({
        enabled: true
    });

    // Routes
    $routeProvider.
        when('/home', {
            templateUrl: 'views/partials/home/home.html'
        }).
        when('/', {
            templateUrl: 'views/partials/account/login/login.html'
        }).
        when('/forgot', {
            templateUrl: 'views/partials/account/forgot/forgot.html'
        }).
        when('/events', {
            templateUrl: 'views/partials/events/events-list/events-list.html'
        }).
        when('/event?:eventId', {
            templateUrl: 'views/partials/events/view-event/view-event.html'
        }).
        when('/event/add-students?:eventId', {
            templateUrl: 'views/partials/events/add-students/add-students.html'
        }).
        when('/event/add-interviewers?:eventId', {
            templateUrl: 'views/partials/events/add-interviewers/add-interviewers.html'
        }).
        when('/event/schedule?:eventId', {
            templateUrl: 'views/partials/events/schedule/schedule.html'
        }).
        when('/students', {
            templateUrl: 'views/partials/students/students.html'
        }).
        when('/interviewers', {
            templateUrl: 'views/partials/interviewers/interviewers.html'
        }).
        when('/archived-events', {
            templateUrl: 'views/partials/events/archived-events/archived-events.html'
        }).
        when('/archived-students', {
            templateUrl: 'views/partials/students/archived-students/archived-students.html'
        }).
        when('/archived-interviewers', {
            templateUrl: 'views/partials/interviewers/archived-interviewers/archived-interviewers.html'
        }).
        when('/profile', {
            templateUrl: 'views/partials/account/profile/profile.html'
        }).
        when('/logout', {
            templateUrl: 'views/partials/account/logout/logout.html'
        }).
        when('/new-event', {
            templateUrl: 'views/partials/events/new-event/new-event.html'
        }).
        when('/reset/:token', {
            templateUrl: 'views/partials/account/reset/reset.html',
            controller: 'reset'
        }).
        otherwise({
            redirectTo: '/'
    })
}]);

/*
Toolbar controller
 */
app.controller('toolbar', ['$rootScope','$location','$scope', '$window', function($rootScope, $location, $scope, $window){
    $scope.paths = true;
    $rootScope.$on('logged In', function(){
        if($window.sessionStorage.token == undefined){
            $scope.paths = true;
        }else{
            $scope.paths = false;
            $scope.user = {
                username: $window.sessionStorage.username.replace(/^"(.*)"$/, '$1')
            };
        }
    });
    $scope.goHome = function(){
        $location.path('/');
    }
}]);

/*
Directive to check the passwords are the same
 */
app.directive("passwordVerify", function() {
    return {
        require: "ngModel",
        scope: {
            passwordVerify: '='
        },
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(function() {
                var combined;
                if (scope.passwordVerify || ctrl.$viewValue) {
                    combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                }
                return combined;
            }, function(value) {
                if (value) {
                    ctrl.$parsers.unshift(function(viewValue) {
                        var origin = scope.passwordVerify;
                        if (origin !== viewValue) {
                            ctrl.$setValidity("passwordVerify", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("passwordVerify", true);
                            return viewValue;
                        }
                    });
                }
            });
        }
    };
});