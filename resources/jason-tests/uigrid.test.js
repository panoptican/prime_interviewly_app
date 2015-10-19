var app = angular.module('app', ['ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.exporter']);

app.controller('generateCtrl', ['$scope', '$http', 'uiGridConstants', function($scope, $http, uiGridConstants) {

    // Initialize UI Grid variables
    var gridCols = [];
    var gridData = [];

    // UI Grid options
    $scope.gridOptions = {
        enableSorting: false,
        enableGridMenu: true,
        enableFiltering: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        }
    };

    // UI Grid generate function called on click "Generate" button
    $scope.generate = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/test'
        }).then(function successCallback(response) {

            // empty the UI Grid variables in case there is data
            $scope.gridOptions.columnDefs = [];
            $scope.gridOptions.data = [];
            gridCols = [];
            gridData = [];

            // console log API response for debugging
            console.log(response);

            // iterate over the interviewer array within the response
            // create various arrays and objects to meet UI Grid data requirements
            response.data.interviewer.forEach(function(item, pos) {

                // push the company and interviewer name into the column names array
                // this will be the column header for a particular interviewer
                gridCols.push({name: item.company + ' / ' + item.fName, field: item.company + '_' + item.name, width:150, displayName: item.company + ' / ' + item.fName});

                // set the scheduled object to a variable
                // this object contains the entire schedule for an interviewer
                var sched = item.scheduled;

                // initiate an empty students array
                // this will be used to store the formatted schedule for each company
                var students = [];

                // iterate over the scheduled object using the getOwnPropertyNames method
                Object.getOwnPropertyNames(sched).forEach(function (elem, index, array) {

                    // create an array of objects that contains each scheduled item
                    // this array will contain the formatted schedule for an interviewer
                    students.push({[item.company + '_' + item.fname]: sched[elem]});
                });

                // push the updated schedule array into the master gridData array
                gridData.push(students);
            });

            // gridData is still not correctly formatted
            // each item represents an interviewer column
            // when in fact, UI Grid requires each item in the array to be a row of data
            // Underscore unzip function performs necessary matrix transformation
            gridData = _.unzip(gridData);

            // initiate empty array to store each row as an object of objects
            var gridArr = [];

            // iterate over unzipped gridData
            gridData.forEach(function (item, pos) {

                // initiate empty object for storing individual schedule items
                var rowObj = {};

                // iterate over the schedule row
                // each item in the row array represents a single cell in the grid
                item.forEach(function (elem, index) {

                    // use Underscore extend method to "push" each item into row object
                    _.extend(rowObj, elem);
                });

                // push the row object into the previously initiated grid array
                gridArr.push(rowObj);
            });

            // initiate an empty object for storing the entire schedule
            gridObj = {};

            // using Underscore extend again, push the array of objects into the master object
            _.extend(gridObj, gridArr);

            // update the gridData variable
            gridData = gridArr;
            }

        // after capturing and formatting the data, update UI Grid options
        ).then(function() {
            $scope.gridOptions.columnDefs = gridCols;
            $scope.gridOptions.data = gridData;

        // after updating UI Grid options, force grid refresh
        }).then(function() {
        console.log('Updated?', gridCols);
        console.log('Updated?', gridData);
        $scope.gridApi.grid.notifyDataChange(uiGridConstants.dataChange.ALL);
        $scope.gridApi.grid.refresh();
        })
    }
}])