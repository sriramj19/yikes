'user strict';

var app = angular.module('app');
/* Login Service */

app.factory('LoginService', function($http) {
  return {
    //API Call for register user
    register: function(url, userName, password) {
      return $http.post(url + 'users/register', {userName: userName, password: password}).then(function(response) {
        return response.data
      }, function(x) {
        return x.data;
      });
    },
    //API Call for user login
    login: function(url, name, password) {
      return $http.post(url + 'users/login', {userName: name, password : password}).then(function(response) {
        return response.data;
      }, function(x) {
        return x.data;
      });
    }
  }
});
