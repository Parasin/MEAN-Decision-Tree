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
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
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
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
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
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });
    };
}]);

/* Customer table controller */
loginApp.controller('custController', 
    ['$scope', '$log', '$routeParams', 'customerFactory',
    function ($scope, $log, $routeParams, customerFactory) {
        $scope.sortBy = 'name';
		$scope.reverse = false;
		$scope.customers = [];

        function init() {
            $scope.customers = customerFactory.getCusts();
        }

		$scope.doSort = function(propName) {
			$scope.sortBy = propName; 
			$scope.reverse = !$scope.reverse;
		};
	
		init();
}]);

loginApp.controller('mainController', ['$scope', '$log', function($scope, $log){
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

    $scope.addNode = function () {
        try {
            $scope.node = {id: $scope.nodeId, label: $scope.nodeLabel};
            $scope.edge = {id: edges.length + 1, from: $scope.parentNodeId, to: $scope.node.id, label: $scope.edgeLabel};
            $scope.nodes.push($scope.node);
            nodes.add($scope.node);
           
            $scope.edges.push($scope.edge);
            edges.add($scope.edge);
            $scope.nodes = nodes.get();
            $scope.edges = edges.get();
           
            
            
            $scope.nodeId = $scope.nodeLabel = $scope.edgeLabel = $scope.parentNodeId =  '';
        }
        catch (err) {
            alert(err);
        }
    };
    
    $scope.updateNode = function () {
        try {
            $scope.node = {id: $scope.nodeId, label: $scope.nodeLabel};
            nodes.update($scope.node);
            
            $scope.nodes = nodes.get();
            $scope.edges = edges.get();
            
            $scope.nodeId = $scope.nodeLabel = $scope.edgeLabel = '';
        }
        catch (err) {
            alert(err);
        }
    };
    
    $scope.deleteNode = function () {
        try {
            $scope.node = {id: $scope.nodeId, label: $scope.nodeLabel};
            nodes.remove($scope.node);
           
            $scope.nodes = nodes.get();
            $scope.edges = edges.get();
            
            $scope.nodeId = $scope.nodeLabel = $scope.edgeLabel = '';
        } 
        catch (err) {
            alert(err);
        }
    };
}]);