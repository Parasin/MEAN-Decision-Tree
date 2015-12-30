var loginApp = angular.module('loginApp');

loginApp.directive('customer', function() {
    return {
        replace: false,
        transclude: true,
        scope: {
            customers: '='
        },
        templateUrl: 'directives/customer.html'
    } 
});