var app = angular.module('app', ['ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit']);

app.controller('generateCtrl', ['$scope', '$http', function($scope, $http) {

    var gridDest = document.getElementById('grid-dest');
    var gridCols = [];
    var gridData = [];

    $scope.gridOptions = {
        enableSorting: false,
        columnDefs: gridCols,
        data: gridData,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        }
    };

    $scope.generate = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/test'
        })
        .then(function successCallback(response) {
            console.log(response);
            gridCols = [];
            gridData = [];
            response.data.interviewer.forEach(function(item, pos) {
                gridCols.push({name: item.company + ' / ' + item.name, field: item.company + '_' + pos, width:150, displayName: item.company});
                var sched = item.scheduled;
                var students = [];
                Object.getOwnPropertyNames(sched).forEach(function (elem, index, array) {
                    students.push({[item.company + '_' + pos]: sched[elem]});
                });
                gridData.push(students);
            });
            console.log(gridData);
            gridData = _.unzip(gridData);
            console.log(gridData);
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
            gridData = gridArr;
            }
        ).then(function () {
            $scope.gridOptions.columnDefs = gridCols;
            $scope.gridOptions.data = gridData;
        })
    }
}])