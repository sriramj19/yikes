'use strict';

var app = angular.module('app');
/* Login Controller */ /*Deals with various Users accounts*/

app.controller('LoginController',
 ['$scope', '$http', '$state', '$localStorage', 'LoginService',
  function($scope, $http, $state, $localStorage, LoginService) {

  /*Login for existing user*/
  $scope.login = function() {
    LoginService.login($scope.app.apiURL, $scope.userName, $scope.password).then(function(response) {
      if(response.error) {
        alert(response.error);
      }
      else {
        if(response) {
          //Store in local storage for faster login and retrieval of user details
          $localStorage.userDetails = _.clone(response);
          $state.go('dashboard');
        }
      }
    });
  }

  /*Register a new user*/
  $scope.register = function() {
    LoginService.register($scope.app.apiURL, $scope.userName, $scope.password).then(function(response) {
      if(response.error) {
        alert(response.error);
      }
      else {
        if(response) {
          //Store in local storage for faster login and retrieval of user details
          $localStorage.userDetails = _.clone(response);
          $state.go('dashboard');
        }
      }
    });
  }

  /*Checks whether user is already logged in*/
  $scope.checkCredentials = function() {
    if($localStorage.userDetails) {
      $scope.app.userDetails = _.clone($localStorage.userDetails);
      $state.go('dashboard');
    }
  }
}]);
