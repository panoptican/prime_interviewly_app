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