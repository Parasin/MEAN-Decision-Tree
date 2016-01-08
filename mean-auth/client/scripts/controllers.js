var loginApp = angular.module('loginApp');

/* Main controller */
loginApp.controller('navController',
    ['$scope', '$location', function($scope, $location) {
         $scope.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };
}]);

/* Login controller */
loginApp.controller('loginController',
  ['$scope', '$location', 'authFactory',
  function ($scope, $location, authFactory) {
    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      authFactory.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
    };
}]);

/* Register controller */
loginApp.controller('registerController',
  ['$scope', '$location', 'authFactory',
  function ($scope, $location, authFactory) {
    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      authFactory.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });
    };
}]);

/* Logout controller */
loginApp.controller('logoutController',
  ['$scope', '$location', 'authFactory',
  function ($scope, $location, authFactory) {

    $scope.logout = function () {

      // call logout from service
      authFactory.logout()
        .then(function () {
          $location.path('/login');
        });
    };
}]);

loginApp.controller('mainController', ['$scope', '$log', 'treeFactory', function($scope, $log, treeFactory){
    $scope.nodeId;
    $scope.nodeLabel;
    $scope.edgeLabel;
    $scope.node;
    $scope.nodes = nodes.get();
    $scope.edge;
    $scope.edges = edges.get();
    $scope.state = "add";
    $scope.parentNodeId;
    $scope.reverse = false;
    $scope.doSort = function(propName) {
        $scope.sortBy = propName; 
        $scope.reverse = !$scope.reverse;
    };
    
    $scope.addNode = treeFactory.addNode;
    $scope.updateNode = treeFactory.updateNode;
    $scope.deleteNode = treeFactory.deleteNode;
}]);