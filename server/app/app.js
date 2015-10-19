var app = angular.module('app', ['ngMaterial', 'ngRoute', 'ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.exporter']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.html5Mode({
        enabled: true
    });
    $routeProvider.
        when('/home', {
            templateUrl: 'views/partials/home.html'
        }).

        when('/', {
            templateUrl: 'views/partials/login/login.html'
        }).
        when('/forgot', {
            templateUrl: 'views/partials/forgot/forgot.html'
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
            templateUrl: 'views/partials/archived-events/archived-events.html'
        }).

        when('/profile', {
            templateUrl: 'views/partials/profile/profile.html'
        }).

        when('/logout', {
            templateUrl: 'views/partials/logout/logout.html'
        }).

        when('/new-event', {
            templateUrl: 'views/partials/new-event/new-event.html'
        }).
        when('/:token', {
            templateUrl: 'views/partials/reset/reset.html',
            controller: 'reset'
        }).
        otherwise({
            redirectTo: '/views/partials/login.html'
    })
}]);
//Student Dialog Controller
app.controller('student', ['$scope', '$mdDialog', function($scope,$mdDialog){
    $scope.openStudents = function(ev){
        $mdDialog.show({
            controller: addStudent,
            templateUrl: 'views/partials/dialogs/student.dialog.html',
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
        }
    }

}]);
//Interviewer Dialog Controller
app.controller('interviewer', ['$scope', '$mdDialog', function($scope, $mdDialog){
    $scope.openInterviewer = function(ev){
        $mdDialog.show({
            controller: 'addInterviewer',
            templateUrl: 'views/partials/dialogs/interviewer.dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
    };
    function addInterviewer($scope, $mdDialog){
    $scope.close = function(){
        $mdDialog.hide();
    };
    $scope.cohorts = [
        {name: 'Delta'},
        {name: 'gamma'},
        {name: 'Epsilon'}
    ];
    $scope.events = [
        {name: 'mocks Delta'},
        {name: 'career Delta'},
        {name: 'mocks Epsilon'}
    ]
    }
}]);
//Upload Dialog controller
app.controller('uploads', ['$scope', '$mdDialog', function($scope, $mdDialog){
    $scope.openUploads = function(ev){
        $mdDialog.show({
            controller: uploadFile,
            templateUrl: 'views/partials/dialogs/upload.dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
    };
    function uploadFile($scope, $mdDialog){
        $scope.close = function() {
            $mdDialog.hide();
        }
    }
}]);
//controller for the registration also sends post to create a user
app.controller('registerOpen', ['$scope', '$mdDialog', '$http', function($scope, $mdDialog){
    $scope.openRegister = function(ev){
        $mdDialog.show({
            controller: register,
            templateUrl: 'views/partials/dialogs/register.dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
    };
    function register($scope, $http, $mdDialog) {
        $scope.register = function(username, email, password){
            $http.post('/api/users', {
                username: username,
                email: email,
                password: password
            }).then(function(response){
                console.log(response);
                if(response == 200) {
                    $mdDialog.hide()
                }
            });
        };
        $scope.close = function(){
            $mdDialog.hide();
        };
    }
}]);
//controller to send reset email
app.controller('sendEmail', ['$scope', '$http', '$location', function($scope, $http, $location){
    $scope.send = function(email) {
        $http.post('/forgot', {email: email}).then(function (response) {
            if (response.status == 200) {
                $location.path('/')
            }
        })
    }
}]);
//controller to send password to authentication and login to website on confirmation
app.controller('login', ['$rootScope','$scope', '$http', '$location', '$mdToast', function($rootScope, $scope, $http, $location, $mdToast){
    $scope.submit = function(username, password){
        $http.post('/authenticate', {username: username, password: password}).then(function(response){
                if(response.data.token){
                    sessionStorage.username = angular.toJson(response.data.user.username);
                    sessionStorage.email = angular.toJson(response.data.user.email);
                    sessionStorage.token = angular.toJson(response.data.token);
                    $location.path('/events');
                    $rootScope.$broadcast('logged In')
                }else{
                    $mdToast.showSimple(response.data.error)
                }

            }

        )
    }
}]);
//controller for main toolbar
app.controller('toolbar', ['$rootScope','$scope', '$window', function($rootScope, $scope, $window){
    $scope.user = $window.sessionStorage;
    $scope.paths = true;
    $rootScope.$on('logged In', function(){
        if($window.sessionStorage.token == undefined){
            $scope.paths = true;
        }else{
            $scope.paths = false;
        }
    })

}]);
app.controller('reset',['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){
    $scope.changePass = function(password, confirm){
        console.log(password);
        var token = $routeParams.token;
        if(password === confirm){
            $http.post('/reset', {password: password, token: token}).then(function(response){
                console.log(response);
                if(response.status === 200){
                    $location.path('/');
                }
            })
        }
    }
}]);
//controller for the logout functionality
app.controller('logout', ['$rootScope', '$scope','$location', '$interval', function($rootScope, $scope, $location, $interval){
    $scope.logout = function(){
        $location.path('/logout');
        sessionStorage.clear();
        $rootScope.$broadcast('logged In');
        $interval(function() {
            $location.path('/')
        }, 3000, 1)
    };
}]);
//directive to check the passwords are the same
app.directive('verifySame', function(){
       return {
           require: "ngModel",
           scope: {
               otherModelValue: "=compareTo"
           },
           link: function(scope, element, attributes, ngModel) {

               ngModel.$validators.compareTo = function(modelValue) {
                   return modelValue == scope.otherModelValue;
               };

               scope.$watch("password", function() {
                   ngModel.$validate();
               });
           }
       };
});