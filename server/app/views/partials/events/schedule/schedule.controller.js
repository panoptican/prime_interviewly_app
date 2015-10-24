
/*
Generate event controller
 */
app.controller('eventSchedule', ['$scope', '$http', '$routeParams', 'scheduleGet', 'eventDetails', function($scope, $http, $routeParams, scheduleGet, eventDetails) {

    // Save button
    $scope.saveButton = 'Save';

    // event ID
    var eventParam = $routeParams._id;
    $scope.eventId = eventParam;

    // schedule data
    var scheduleId;
    var hasSchedule;

    // Initialize UI Grid variables
    var gridCols = [];
    var gridData = [];

    // Initialize time slots column for UI Grid
    var timeCol;
    var timeColLabel = {name: 'intTime', field: 'intTime', width: 100, pinnedLeft: true, enableCellEdit:false, displayName: 'Time Slot'};

    // UI Grid options
    $scope.gridOptions = {
        enableSorting: false,
        enableGridMenu: true,
        enableFiltering: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        }
    };

    eventDetails.variables(eventParam).then(function(response) {

        // update hasSchedule variable
        hasSchedule = response.schedule.length > 0;

        // push first time slot into time columns variable
        timeCol = [{intTime: moment(response.startTime, 'HH:mm').format('h:mm A')}];

        // iterate over the remainder of time slots and push each into time columns variable
        var rowCount = response.slotCount;
        while (rowCount--){
            timeCol.push({intTime: moment(response.startTime, 'HH:mm').add((response.slotLength * (response.slotCount - rowCount)), 'minutes').format('h:mm A')})
        }

        // pop off any extra time slots
        // i.e. there is enough time for x number of interviews but last slot is shorter than desired duration
        if(timeCol.length > response.slotCount) {
            timeCol.pop();
        }
    }).then(function() {
        if (hasSchedule) {

            // Update the save button state
            $scope.saveButton = 'Saved';

            // empty the UI Grid variables in case there is data
            $scope.gridOptions.columnDefs = [];
            $scope.gridOptions.data = [];
            gridCols = [];
            gridData = [];

            // push time slot column into UI Grid variables
            gridCols.push(timeColLabel);
            gridData.push(timeCol);

            scheduleGet.getFormattedSchedule(eventParam, gridCols, gridData).then(function(response) {
                gridCols = response.cols;
                gridData = response.data;
            }).then(function() {
                $scope.gridOptions.columnDefs = gridCols;
                $scope.gridOptions.data = gridData;
            });
        }
    });

    // "Generate" button click function
    $scope.generate = function () {

        // Update the save button state
        $scope.saveButton = 'Save';

        // empty the UI Grid variables in case there is data
        $scope.gridOptions.columnDefs = [];
        $scope.gridOptions.data = [];
        gridCols = [];
        gridData = [];

        // push time slot column into UI Grid variables
        gridCols.push(timeColLabel);
        gridData.push(timeCol);

        scheduleGet.getFormattedSchedule(eventParam, gridCols, gridData).then(function(response) {
            scheduleId = response.id;
            gridCols = response.cols;
            gridData = response.data;
        }).then(function() {
            $scope.gridOptions.columnDefs = gridCols;
            $scope.gridOptions.data = gridData;
        });
    };

    $scope.saveEvent = function() {
        console.log(scheduleId);
        $http.post('/api/event/saveSchedule?_id=' + eventParam, {_id: scheduleId}).then(function success(response) {
            console.log(response);
            $scope.saveButton = 'Saved';
        })
    };
}]);