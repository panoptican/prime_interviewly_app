var app = angular.module('app', ['ngMaterial', 'ngRoute', 'isteven-multi-select']);

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
            redirectTo: '/'
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

app.controller('login', ['$scope', '$http', '$location', '$mdToast', function($scope, $http, $location, $mdToast){
    $scope.submit = function(username, password){
        $http.post('/authenticate', {username: username, password: password}).then(function(response){
                console.log(response);
                if(response.data.token){
                    $location.path('/home')
                }else{
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Invalid Username or Password')
                            .position(bottom)
                            .hideDelay(3000)
                    );
                }

            }

        )
    }
}]);