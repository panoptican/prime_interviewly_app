var app = angular.module('app', ['ui.grid', 'ui.grid.edit']);

app.controller('generateCtrl', ['$scope', '$http', function($scope, $http) {

    var gridDest = document.getElementById('grid-dest');
    var gridCols = [];
    var gridData = [];

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
                    gridCols = [];
                    gridData = [];
                    response.data.interviewer.forEach(function(item, pos) {
                        gridCols.push({name: item.company + ' / ' + item.name, field: item.company + '_' + pos, width:200, displayName: item.company});
                        var sched = item.scheduled;
                        var students = [];
                        Object.getOwnPropertyNames(sched).forEach(function (elem, index, array) {
                            students.push({[item.company + '_' + pos]: sched[elem]});
                        });
                        gridData.push(students);
                    });
                gridData = _.unzip(gridData);
                var gridArr = [];
                gridData.forEach(function (item, pos) {
                    var rowObj = {};
                    item.forEach(function (elem, index) {
                        _.extend(rowObj, elem);
                    });
                    gridArr.push(rowObj);
                });
                gridObj = {};
                _.extend(gridObj, gridArr);
                console.log(gridObj);
                gridData = gridArr;
                },

                function errorCallback(response) {}
            )

            .then(function () {
                $scope.gridOptions.columnDefs = gridCols;
                $scope.gridOptions.data = gridData;
            })
    }
}]);