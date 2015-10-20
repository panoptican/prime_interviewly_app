
// Profile controller
app.controller('profile', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location){
    $scope.username = $window.sessionStorage.username.replace(/^"(.*)"$/, '$1');
    $scope.email = $window.sessionStorage.email.replace(/^"(.*)"$/, '$1');
    $scope.save = function(password){
        var username = $scope.username;
        var email = $scope.email;
        $http.post('/change', {username: username, email: email, password: password}).then(function(response){
            if(response.status === 200){
                $location.path('/events')
            }
        });
    }
}]);