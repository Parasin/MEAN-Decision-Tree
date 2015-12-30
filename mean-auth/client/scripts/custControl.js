(function() {
	var CustController = function($scope, $log, $routeParams, customerFactory) {
		$scope.sortBy = 'name';
		$scope.reverse = false;
		$scope.customers = [];
		$scope.appSet = appSettings;

		function init() {
			customerFactory.getCusts()
				.success(function(customers) {
					$scope.customers = customers;
				})
				.error(function(data, status, headers, config) {
					$log.log(data.error + ' ' + status);
				});
		}

		$scope.doSort = function(propName) {
			$scope.sortBy = propName; 
			$scope.reverse = !$scope.reverse;
		};

		$scope.deleteCust = function(custId) {
			customerFactory.deleteCust(custId)
				.success(function(status) {
					if(status) { 
						for (var i = 0; i < $scope.customers.length; i++) {
							if($scope.customers[i].id === custId) { 
								$scope.customers.splice(i,1);
								break;
							}	
						};
					} else {
						$window.alert("Unable to delete customer");
					}
				})
				.error(function(data, status, headers, config) {
					$log.log(data.error + " " + status);
				});
		};
	
		init();
	};

	CustController.$inject = ['$scope', '$log', '$routeParams', 'customerFactory', 'appSettings'];

	angular.module('loginApp').controller('CustController', CustController);
}());