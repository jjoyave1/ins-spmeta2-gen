(function() {
	"use strict";

	angular
		.module("app.shared-services")
		.factory("SampleService", SampleService);

	SampleService.$inject = [];

	function SampleService() {
		var service = {
		};

		return service;
	}
})();
