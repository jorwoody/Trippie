'use strict';

//Events service used for events REST endpoint
angular.module('trippie.notes').factory('Notes', ['$resource', function($resource) {
    return $resource('trips/:tripId/destinations/:destinationId/notes/:noteId', null,
	{
		update: {
			method: 'PUT'
		}
	});
}]);
