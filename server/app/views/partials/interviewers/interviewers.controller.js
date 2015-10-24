app.controller('interviewers', ['$scope', '$http', '$rootScope', '$mdDialog', function($scope, $http, $rootScope, $mdDialog){
  $http.get('/api/interviewer').then(function(response){
   $scope.interviewers = response.data
  });

 $rootScope.$on('got/interviewers', function(){
  $http.get('/api/interviewer').then(function(response){
   $scope.interviewers = response.data
  });
 });

 $scope.editInterviewer = function(id) {
  $http.get('/api/interviewer?_id=' + id).then(function (response) {
   $scope.interviewer = response.data[0];
   $mdDialog.show({
    controller: 'editInterviewer',
    locals: {
     items: $scope.interviewer
    },
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