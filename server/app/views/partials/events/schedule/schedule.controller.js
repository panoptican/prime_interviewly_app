
/*
Generate event controller
 */
app.controller('eventSchedule', ['$scope', '$http', '$routeParams', 'scheduleConfig', 'eventDetails', function($scope, $http, $routeParams, scheduleConfig, eventDetails) {

    // Save button
    $scope.saveButton = 'Save';

    // event ID
    var eventParam = $routeParams._id;
    $scope.eventId = eventParam;

    // schedule data
    var uglySchedule;
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

        // schedule information
        hasSchedule = response.schedule;

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
        if (hasSchedule.length > 0) {

            // set the unformatted schedule to uglySchedule
            uglySchedule = hasSchedule[0];

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

            // format the schedule
            var savedSchedule = scheduleConfig.formatSchedule(uglySchedule, gridCols, gridData);

            // set UI Grid values to saved schedule
            $scope.gridOptions.columnDefs = savedSchedule.cols;
            $scope.gridOptions.data = savedSchedule.data;
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

        $http.get('api/event/getSchedule?_id=' + eventParam).then(function (response) {

            // store the schedule ID in case it is saved
            scheduleId = response.data._id;

            // set the unformatted schedule to uglySchedule
            uglySchedule = response.data;

            // format the schedule
            var savedSchedule = scheduleConfig.formatSchedule(uglySchedule, gridCols, gridData);

            // set UI Grid values to saved schedule
            $scope.gridOptions.columnDefs = savedSchedule.cols;
            $scope.gridOptions.data = savedSchedule.data;
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