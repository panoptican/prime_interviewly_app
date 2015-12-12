app.controller('interviewers', ['$scope', '$rootScope', '$mdDialog', '$filter', 'InterviewerFactory', function($scope, $rootScope, $mdDialog, $filter, InterviewerFactory){
    $scope.selected = [];
    $scope.selectAll = false;
    $scope.filtered = [];
    $scope.search = {$: ''};

    //GET all interviewers
    var getInterviewers = function(){
        $scope.interviewers = InterviewerFactory.query();
    };

    getInterviewers();

    //filter interviewers depending on search input
    $scope.$watch('search.$', function(newValue, oldValue) {
        if(newValue || oldValue){
            $scope.filtered = $filter('filter')($scope.interviewers, $scope.search);
        }
    });

    //$rootScope.$on('got/interviewers', function(){
    //    getInterviewers();
    //});

    // clear search box and remove filter toolbar view
    $scope.removeFilter = function () {
        $scope.search.$ = '';
        $scope.filter.show = false;
    };

    // clear filter and cancel and selected items
    $scope.cancelSelected = function() {
        $scope.selected = [];
        $scope.search.$ = '';
        $scope.interviewers.forEach(function(interviewer){
            interviewer.selected = false;
        });
        $scope.selectAll = false;
    };

    $scope.editInterviewer = function(id) {
        $scope.interviewer = InterviewerFactory.get({id: id});
        $mdDialog.show({
            controller: 'editInterviewer',
            locals: {items: $scope.interviewer},
            templateUrl: 'views/partials/dialogs/interviewer/interviewerEdit.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    };

    $scope.archive = function(interviewer){
        InterviewerFactory.update({id: interviewer._id}, {isArchived: true});
        var i = $scope.interviewers.indexOf(interviewer);
        $scope.interviewers.splice(i, 1);
    };

    $scope.toggleRow = function(interviewer) {
        var i = $scope.selected.indexOf(interviewer);
        if(i === -1){
            $scope.selected.push(interviewer);
            interviewer.selected = true;
        } else {
            $scope.selected.splice(i, 1);
            interviewer.selected = false;
        }
        $scope.selectAll = false;
    };

    $scope.toggleAll = function(interviewers) {
        if($scope.selected.length == interviewers.length ||
            $scope.selected.length == $scope.filtered.length &&
            $scope.filtered.length > 0){
                $scope.selected = [];
                $scope.interviewers.forEach(function(interviewer){
                    interviewer.selected = false;
                });
        } else if ($scope.filtered.length > 0) {
            $scope.selected = $scope.filtered.slice();
            $scope.filtered.forEach(function(interviewer){
                interviewer.selected = true;
            });
        } else {
            $scope.selected = $scope.interviewers.slice();
            $scope.interviewers.forEach(function(interviewer){
                interviewer.selected = true;
            });
        }
    };
}]);

app.controller('editInterviewer', ['$scope', '$mdDialog', 'items', 'InterviewerFactory', '$rootScope', function($scope, $mdDialog, items, InterviewerFactory, $rootScope){
 $scope.interviewer = items;

 $scope.edit = function(interviewer){
     InterviewerFactory.update({id: interviewer._id}, interviewer);
     $rootScope.$broadcast('got/interviewers');
     $mdDialog.hide();
 };

 $scope.close = function(){
  $mdDialog.hide();
 }
}]);