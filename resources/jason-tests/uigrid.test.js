var app = angular.module('app', ['ui.grid', 'ui.grid.edit']);

app.controller('generateCtrl', ['$scope', '$http', function($scope, $http) {

    var gridDest = document.getElementById('grid-dest');
    var gridCols = [];
    var gridData = [];
    var gridRows = [];

    $scope.gridOptions = {
        enableSorting: false,
        columnDefs: gridCols,
        data: gridData
    };

    $scope.generate = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/test'
        })
            .then(
                function successCallback(response) {
                    console.log(response);
                    response.data.interviewer.forEach(function(item, pos) {
                        gridCols.push({name: item.company + ' / ' + item.name, field: item.company + '_' + pos});
                        //item.scheduled.forEach(function(item, pos) {
                        //  console.log(item);
                        //})
                        var sched = item.scheduled;
                        var students = [];
                        Object.getOwnPropertyNames(sched).forEach(function (item, pos, array) {
                            students.push(sched[item]);
                        });
                        gridData.push({[item.company + '_' + pos]: students});
                    });
                console.log(gridData);
                },

                function errorCallback(response) {}
            )

            .then(function () {
                $scope.gridOptions.columnDefs = gridCols;
                $scope.gridOptions.data = gridData;
            })
    }
}]);