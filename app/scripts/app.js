'use strict';

angular.module('handCoolerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'mgcrea.ngStrap',
  'angulartics',
  'angulartics.google.analytics'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/search/:query/', {
        templateUrl: 'views/search.html',
        controller: 'GemsCtrl'
      })
      .when('/search/:query/:page', {
        templateUrl: 'views/search.html',
        controller: 'GemsCtrl'
      })
      .when('/gems/:gemName', {
        templateUrl: 'views/gem_detail.html',
        controller: 'GemDetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).controller('HeaderCtrl', function ($scope, $location) {
    $scope.doSearch = function (query) {
      $location.path('/search/' + query);
    }
  });
//  .config(function($locationProvider) {
//    $locationProvider.html5Mode(true);
//    $locationProvider.hashPrefix('!');
//  });
