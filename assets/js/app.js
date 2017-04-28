'use strict';

//State and Route Provider
angular.module('app', [
    'ui.router',
    'ngAnimate',
    'ngStorage',
    'oc.lazyLoad'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/', '/login'),
    $urlRouterProvider.otherwise('/login'),

    $stateProvider.state('base', {
        'abstract': !0,
        url: '',
        templateUrl: 'views/base.html'
    })
    .state('login', {
        url: '/login',
        parent: 'base',
        templateUrl: 'views/login.html',
        resolve: { login: function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'app',
            files: ['js/controllers/LoginController.js', 'js/services/login.js']
          })
        }
      }
    })
    .state('dashboard', {
        url: '/dashboard',
        parent: 'base',
        templateUrl: 'views/dashboard.html',
        resolve: { dashboard: function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'app',
            files: ['js/controllers/ChatController.js', 'js/services/chat.js']
          })
        }
      }
    })
}]);
