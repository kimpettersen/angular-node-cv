'use strict';

var CVApp = angular.module('CVApp', ['bucketlistServices',
                                      'educationServices',
                                      'experienceServices',
                                      'meServices',
                                      'userServices',
                                      'adminResources'
                                      ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/documentation', {
        templateUrl: 'views/documentation.html',
        controller: 'DocCtrl'
      })
      .when('/admin/bucketlist', {
        templateUrl: 'views/admin/bucketlist.html',
        controller: 'BucketlistCtrl'
      })
      .when('/admin/education', {
        templateUrl: 'views/admin/education.html',
        controller: 'EducationCtrl'
      })
      .when('/admin/experience', {
        templateUrl: 'views/admin/experience.html',
        controller: 'ExperienceCtrl'
      })
      .when('/admin/me', {
        templateUrl: 'views/admin/me.html',
        controller: 'MeCtrl'
      })
      .when('/admin/user', {
        templateUrl: 'views/admin/user.html',
        controller: 'UserCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
