'use strict';

// Destinations routes use destinations controller
var trips = require('../controllers/trips');
var destinations = require('../controllers/destinations');
var authorization = require('./middlewares/authorization');

// Destination authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.trip.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.post('/trips/:tripId', authorization.requiresLogin, destinations.create);
    app.post('/trips/:tripId/destinations', authorization.requiresLogin, destinations.create);
    app.get('/trips/:tripId/destinations/:destinationId', destinations.show);
    app.put('/trips/:tripId/destinations/:destinationId', authorization.requiresLogin, hasAuthorization, destinations.update);
    app.del('/trips/:tripId/destinations/:destinationId', authorization.requiresLogin, hasAuthorization, destinations.destroy);

    // Finish with setting up the destinationId and tripID params
    app.param('destinationId', destinations.destination);
    app.param('tripId', trips.trip);
};
