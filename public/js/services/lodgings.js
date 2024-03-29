'use strict';

//Lodgings service used for lodgings REST endpoint
angular.module('trippie.lodgings').factory('Lodgings', ['$resource', function($resource) {
    return $resource('trips/:tripId/destinations/:destinationId/lodgings/:lodgingId', null,
    {
		update: {
			method: 'PUT'
		}
    });
}]);