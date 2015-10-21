
/*
 Logout controller
  */
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