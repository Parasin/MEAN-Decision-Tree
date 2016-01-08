var loginApp = angular.module('loginApp', ['ngRoute', 'ngAnimate', 'ngResource']);

loginApp.run(function ($rootScope, $location, $route, authFactory) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && authFactory.isLoggedIn() === false) {
      $location.path('/login');
      $route.reload();
    }
  });
});