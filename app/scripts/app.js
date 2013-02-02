'use strict';

var CVApp = angular.module('CVApp', ['educationServices'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/cv/education/index', {
        templateUrl: 'views/education/index.html',
        controller: 'EducationIndexCtrl'
      })
      .when('/cv/education/create', {
        templateUrl: 'views/education/create.html',
        controller: 'EducationCreateCtrl'
      })
      .when('/cv/education/update/:id', {
        templateUrl: 'views/education/update.html',
        controller: 'EducationUpdateCtrl'
      })
      .when('/cv/education/view/:id', {
        templateUrl: 'views/education/view.html',
        controller: 'EducationViewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
