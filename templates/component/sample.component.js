(function() {
	"use strict";

	var componentConfig = {
		bindings: {

		},
		controller: SampleController,
		controllerAs: "vm",
		bindToController: true,
		templateUrl: "templatePath.component.html"
	};

	angular
		.module("moduleName")
		.component("Sample", componentConfig);

	SampleController.$inject = [];

	function SampleController() {
		var vm = this;

	}
})();
