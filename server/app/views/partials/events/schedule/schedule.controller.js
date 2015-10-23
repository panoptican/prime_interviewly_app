
/*
Generate event controller
 */
app.controller('eventSchedule', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    // event ID
    var eventParam = $routeParams._id;
    $scope.eventId = eventParam;

    // Initialize UI Grid variables
    var gridCols = [];
    var gridData = [];
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

    // get event details
    $http.get('api/event?_id=' + eventParam).then(function success(response) {

        console.log(response.data[0]);

        // time experiments
        var startTime = moment(response.data[0].startTime, 'h:mm A').format('HH:mm');
        var endTime = moment(response.data[0].endTime, 'h:mm A').format('HH:mm');
        var eventLength = moment(endTime, 'HH:mm').diff(moment(startTime, 'HH:mm'), 'minutes');
        var slotLength = moment.duration(response.data[0].interviewDuration, 'minutes').asMinutes();
        var slotCount = Math.floor(eventLength/slotLength).toFixed(0);
        console.log(startTime, endTime, eventLength, slotLength, slotCount);
        console.log(moment(startTime, 'HH:mm').add((slotLength * 8), 'minutes').format('h:mm A'));

        timeCol = [{intTime: moment(startTime, 'HH:mm').format('h:mm A')}];
        var rowCount = slotCount;
        while (rowCount--){
            timeCol.push({intTime: moment(startTime, 'HH:mm').add((slotLength * (slotCount - rowCount)), 'minutes').format('h:mm A')})
        }
        console.log(timeCol);

        if(timeCol.length > slotCount) {
            timeCol.pop();
        }

        console.log(timeCol);

    });

    // "Generate" button click function
    $scope.generate = function () {

        // request matches from server given event settings
        $http({
            method: 'GET',
            url: 'api/event/getSchedule?_id=' + eventParam
        }).then(function successCallback(response) {

            // empty the UI Grid variables in case there is data
            $scope.gridOptions.columnDefs = [];
            $scope.gridOptions.data = [];
            gridCols = [];
            gridData = [];

            gridCols.push(timeColLabel);
            gridData.push(timeCol);

            // console log API response for debugging
            console.log(response);

            // iterate over the interviewer array within the response
            // create various arrays and objects to meet UI Grid data requirements
            response.data.interviewer.forEach(function(item, pos) {

                // push the company and interviewer name into the column names array
                // this will be the column header for a particular interviewer
                gridCols.push({name: item.company + ' / ' + item.fName, field: item.company + '_' + item.name, width: 150, displayName: item.company + ' / ' + item.fName});

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
                    titleObj = {};
                    titleObj[item.company + '_' + item.fname] = sched[elem];
                    students.push(titleObj);
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

            // create time slots column
            var timeSlots = [];
            var slotsSize = gridArr.length;
            while(slotsSize--) {
                timeSlots.push({time: 'Slot ' + ((gridArr.length) - slotsSize)});
            }

            console.log(timeSlots);

            // using Underscore extend again, "push" the array of objects into the master object
            _.extend(gridObj, gridArr);

            // update the gridData variable
            gridData = gridArr;

            console.table(gridData);
            console.table(gridCols);
        }).then(function() {

            // after capturing and formatting the data, update UI Grid options
            $scope.gridOptions.columnDefs = gridCols;
            $scope.gridOptions.data = gridData;
        })
    };

    $scope.saveEvent = function() {
        console.log('save');
    };
}]);