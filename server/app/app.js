var app = angular.module('app', ['ngMaterial', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.html5Mode({
        enabled: true
    });
    $routeProvider.
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

        when('/profile', {
            templateUrl: 'views/partials/profile/profile.html'
        }).

        when('/logout', {
            templateUrl: 'views/partials/logout/logout.html'
        }).

        when('/new-event', {
            templateUrl: 'views/partials/new-event/new-event.html'
        }).

        otherwise({
            redirectTo: '/index'
    })
}]);

////Student Dialog Controller
//app.controller('student', ['$scope', '$mdDialog', function($scope,$mdDialog){
//    $scope.openStudents = function(ev){
//        console.log('hello');
//        $mdDialog.show({
//            controller: addStudent,
//            templateUrl: 'views/partials/studentDialog.html',
//            parent: angular.element(document.body),
//            targetEvent: ev,
//            clickOutsideToClose: true
//        })
//    };
//    function addStudent($scope) {
//        $scope.companies = [
//            {name: 'Prime'},
//            {name: 'Nerdery'},
//            {name: 'Digital People'}
//        ];
//        $scope.selections = [];
//        $scope.events = [
//            {name: 'mocks Delta'},
//            {name: 'career Delta'},
//            {name: 'mocks Epsilon'}
//        ]
//    }
//
//}]);
//
////Interviewer Dialog Controller
//app.controller('interviewer', ['$scope', '$mdDialog', function($scope, $mdDialog){
//    $scope.openInterviewer = function(ev){
//        $mdDialog.show({
//            controller: addInterviewer,
//            templateUrl: 'views/partials/interviewerDialog.html',
//            parent: angular.element(document.body),
//            targetEvent: ev,
//            clickOutsideToClose: true
//        })
//    };
//    function addInterviewer($scope){
//    $scope.cohorts = [
//        {name: 'Delta'},
//        {name: 'gamma'},
//        {name: 'Epsilon'}
//    ];
//    $scope.events = [
//        {name: 'mocks Delta'},
//        {name: 'career Delta'},
//        {name: 'mocks Epsilon'}
//    ]
//    }
//}]);
//
////Upload Dialog controller
//app.controller('uploads', ['$scope', '$mdDialog', function($scope, $mdDialog){
//    $scope.openUploads = function(ev){
//        $mdDialog.show({
//            controller: uploadFile,
//            templateUrl: 'views/partials/uploadDialog.html',
//            parent: angular.element(document.body),
//            targetEvent: ev,
//            clickOutsideToClose: true
//        })
//    };
//    function uploadFile(){
//
//    }
//}]);
//controller for the registration also sends post to create a user
app.controller('registerOpen', ['$scope', '$mdDialog', '$http', function($scope, $mdDialog){
    $scope.openRegister = function(ev){
        $mdDialog.show({
            controller: register,
            templateUrl: 'views/partials/register.html',
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
//controller to redirect to forgot password page from landing page button
app.controller('forgot', ['$scope', '$location', function($scope, $location){
    $scope.forgot = function(){
        $location.path('/forgot');
    }
}]);

//controller to send password to authentication and login to website on confirmation
app.controller('login', ['$scope', '$http', '$location', '$mdToast', function($scope, $http, $location, $mdToast){
    $scope.submit = function(username, password){
        $http.post('/authenticate', {username: username, password: password}).then(function(response){
                if(response.data.token){
                    sessionStorage.username = angular.toJson(response.data.user.username);
                    localStorage.token = angular.toJson(response.data.token);
                    $location.path('/home')
                }else{
                    $mdToast.showSimple(response.data.error)
                }

            }

        )
    }
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