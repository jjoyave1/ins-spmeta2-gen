(function() {
	"use-strict";

	angular
		.module("app.shared-components")
		.directive("Sample", Sample);

	function Sample() {
		var directive = {
			scope: {

			},
			restrict: "E",
			controller: SampleController,
			controllerAs: "vm",
			bindToController: true,
			templateUrl: "templatePath.directive.html"
		};

		return directive;
	}

	SampleController.$inject = [];

	function SampleController() {
		var vm = this;
	}
})();
