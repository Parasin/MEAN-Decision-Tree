var loginApp = angular.module('loginApp', ['ngRoute', 'ngAnimate', 'ngResource']);

loginApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && AuthService.isLoggedIn() === false) {
      $location.path('/login');
      $route.reload();
    }
  });
});

loginApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      access: {
            restricted: false,
            permLevel: 0
      }
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      access: {
            restricted: false,
            permLevel: 0
      }
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {
            restricted: false,
            permLevel: 0
      }
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      access: {
            restricted: false,
            permLevel: 0
      }
    })
    .when('/one', {
      template: '<h1>This is page one!</h1>',
      access: {
            restricted: true,
            permLevel: 2
      }
    })
    .when('/two', {
      template: '<h1>This is page two!</h1>',
      access: {
            restricted: false,
            permLevel: 0
      }
    })
    .when('/admin', {
        templateUrl: 'partials/admin.html',
        access: {
            restricted: false,
            permLevel: 1   
        }
    })
    .otherwise({
      redirectTo: '/'
    });
});