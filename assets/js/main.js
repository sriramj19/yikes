'use strict';

//A globally available controller over all states
angular.module('app')
  .controller('AppCtrl', ['$scope', '$state','$localStorage', function($scope, $state, $localStorage) {

    $scope.app = {
      name: 'Yikes!',
      version: '1.0.0',
      apiURL: 'https://yikeschat.herokuapp.com/',
      landing: function() {
        if($localStorage.userDetails) {
          $state.go('dashboard')
        }
        else {
          $state.go('login')
        }
      },
      logout: function() {
        $localStorage.$reset();
        delete $scope.app.userDetails;
        $state.go('login');
      }
    }

}]);
