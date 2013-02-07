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
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/documentation', {
        templateUrl: 'views/documentation.html',
        controller: 'DocCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      // .when('/admin/bucketlist', {
      //   templateUrl: 'views/admin/bucketlist.html',
      //   controller: 'BucketListCtrl'
      // })
      // .when('/admin/education', {
      //   templateUrl: 'views/admin/education.html',
      //   controller: 'EducationCtrl'
      // })
      // .when('/admin/experience', {
      //   templateUrl: 'views/admin/experience.html',
      //   controller: 'ExperienceCtrl'
      // })
      // .when('/admin/me', {
      //   templateUrl: 'views/admin/me.html',
      //   controller: 'MeCtrl'
      // })
      // .when('/admin/user', {
      //   templateUrl: 'views/admin/user.html',
      //   controller: 'UserCtrl'
      // })
      .otherwise({
        redirectTo: '/'
      });
  }]);
