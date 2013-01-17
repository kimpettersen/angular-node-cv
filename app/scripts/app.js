'use strict';

var ANGULARCVApp = angular.module('ANGULARCVApp', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/api/education/index', {
        templateUrl: 'views/education/educationIndex.html',
        controller: 'EducationIndexCtrl'
      })
      .when('/api/education/create', {
        templateUrl: 'views/education/educationCreate.html',
        controller: 'EducationCreateCtrl'
      })
      .when('/api/education/update/:id', {
        templateUrl: 'views/education/educationUpdate.html',
        controller: 'EducationUpdateCtrl'
      })
      .when('/api/education/view/:id', {
        templateUrl: 'views/education/educationView.html',
        controller: 'EducationViewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
