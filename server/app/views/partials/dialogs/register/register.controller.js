
// Register dialog controller
app.controller('registerOpen', ['$scope', '$mdDialog', '$http', function($scope, $mdDialog){
    $scope.openRegister = function(ev){
        $mdDialog.show({
            controller: register,
            templateUrl: 'views/partials/dialogs/register/register.html',
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