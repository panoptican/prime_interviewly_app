var app = angular.module('app', ['ui.grid', 'ui.grid.edit']);

app.controller('generateCtrl', ['$scope', '$http', function($scope, $http) {

    var gridDest = document.getElementById('gridDest');

    $scope.generate = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/test'
        }).then(function successCallback(response) {
            console.log(response.data);
            angular.element(gridDest).empty().append('<grid-elem></grid-elem>');
        }, function errorCallback(response) {});
    }
}]);

app.directive('grid-elem', ['$scope', function($scope) {
    return {
        template: '<div ui-grid="" class="myGrid"></div>'
    }
}]);