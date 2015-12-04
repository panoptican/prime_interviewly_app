app.controller('interviewers', ['$scope', '$http', '$rootScope', '$mdDialog', function($scope, $http, $rootScope, $mdDialog){
    $scope.selected = [];
    $scope.selectAll = false;

    var getInterviewers = function(){
        $http.get('/api/interviewer').then(function(response){
            $scope.interviewers = response.data
        });
    };

    $rootScope.$on('got/interviewers', function(){
        getInterviewers();
    });

    $scope.filter = {options: {debounce: 500}};

    $scope.removeFilter = function () {
        $scope.filter.show = false;
        getInterviewers();
    };

    $scope.cancelSelected = function(selected) {
        var l = selected.length;
        $scope.selected = [];
        while(l--){
            var id = selected[l];
            $scope.interviewers.forEach(function(interviewer){
                if(interviewer._id === id){
                    interviewer.selected = false;
                }
            })
        }
        $scope.selectAll = false;
    };

    $scope.editInterviewer = function(id) {
        $http.get('/api/interviewer?_id=' + id).then(function (response) {
            $scope.interviewer = response.data[0];
            $mdDialog.show({
                controller: 'editInterviewer',
                locals: {items: $scope.interviewer},
                templateUrl: 'views/partials/dialogs/interviewer/interviewerEdit.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            })
        })
    };

    $scope.archive = function(id){
        $http.post('api/interviewer/archive?_id='+id, {isArchived: true}).then(function(response){
            $rootScope.$broadcast('got/interviewers');
        })
    };

    $scope.toggleRow = function(interviewer) {
        var i = $scope.selected.indexOf(interviewer._id);
        if(i === -1){
            $scope.selected.push(interviewer._id);
            interviewer.selected = true;
        } else {
            $scope.selected.splice(i, 1);
            interviewer.selected = false;
        }
    };

    $scope.toggleAll = function() {
        if($scope.selected.length < $scope.interviewers.length){
            $scope.selected = [];
            $scope.interviewers.forEach(function(interviewer){
                $scope.selected.push(interviewer._id);
                interviewer.selected = true;
            })
        } else {
            $scope.selected = [];
            $scope.interviewers.forEach(function(interviewer){
                interviewer.selected = false;
            })
        }
    };

    getInterviewers();
}]);

app.controller('editInterviewer', ['$scope', '$mdDialog', 'items', '$http', '$rootScope', function($scope, $mdDialog, items, $http, $rootScope){
 $scope.interviewer = items;

 $scope.edit = function(interviewer){
  $http.put('api/interviewer?_id=' + interviewer._id, interviewer)
      .then(function(response){
       $rootScope.$broadcast('got/interviewers');
       $mdDialog.hide();
      });
 };

 $scope.close = function(){
  $mdDialog.hide();
 }
}]);