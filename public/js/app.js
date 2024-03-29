'use strict';

angular.module('trippie', [
	'ngCookies',
	'ngResource',
	'ngRoute',
	'ui.bootstrap',
	'ui.route',
	'trippie.system',
	'trippie.trips',
	'trippie.destinations',
	'trippie.events',
	'trippie.notes',
	'trippie.transportations',
	'trippie.lodgings',
	'ui.bootstrap.datetimepicker',
	'ui.bootstrap'
]);
angular.module('trippie.system', []);
angular.module('trippie.trips', []);
angular.module('trippie.destinations', []);
angular.module('trippie.events', []);
angular.module('trippie.notes',[]);
angular.module('trippie.articles', []);
angular.module('trippie.transportations', []);
angular.module('trippie.lodgings', []);
