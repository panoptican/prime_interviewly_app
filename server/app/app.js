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

app.controller('menu', function($mdDialog){
   var originatorEv;
   this.openMenu = function($mdOpenMenu, ev){
       originatorEv = ev;
       $mdOpenMenu(ev);
   }
});