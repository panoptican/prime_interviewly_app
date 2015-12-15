
/*
 Logout controller
  */
app.controller('logout', ['$scope','$location', '$interval', function($scope, $location, $interval){
    $scope.logout = function(){
        $location.path('/logout');
        $interval(function() {
            $location.path('/')
        }, 3000, 1)
    };
}]);