var app = angular.module('app', ['ui.grid', 'ui.grid.edit']);

app.controller('generateCtrl', ['$scope', '$http', function($scope, $http) {

    var gridDest = document.getElementById('grid-dest');
    var gridCols = [];
    var gridData = [];
    var gridRows = [];

    $scope.generate = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/test'
        }).then(function successCallback(response) {
            response.data.interviewer.forEach(function (item) {
                gridCols.push(item.company);
            });

            $scope.gridOptions = {
                
            }

        }, function errorCallback(response) {});
    }
}]);