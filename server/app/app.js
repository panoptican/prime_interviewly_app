(function() {
    'use strict';

    // Declare app level module which depends on views and components
    angular.module('interviewly', [
        'ngRoute',
        'interviewly.events',
        'interviewly.interviewers',
        'interviewly.students'
    ]).
        config(['$routeProvider', function($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/'});
        }]);

})();