'use strict';

(function() {
    // Destinations Controller Spec
    describe('Trippie controllers', function() {
        describe('DestinationsController', function() {
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('trippie'));

            // Initialize the controller and a mock scope
            var DestinationsController,
                scope,
                trip,
                destination,
                $httpBackend,
                $routeParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_, Trips, Destinations) {
                scope = $rootScope.$new();

                $routeParams = _$routeParams_;
                $routeParams.tripId = '525a8422f6d0f87f0e000000';
                $routeParams.destinationId = '525a8422f6d0f87f0e000001';

                DestinationsController = $controller('DestinationsController', {
                    $scope: scope
                });

                scope.transInformation = 'Transportation placeholder';
                var departTime = new Date();
                departTime.setMinutes(0);
                departTime.setSeconds(0);
                departTime.setMilliseconds(0);
                scope.transDepartureTime = departTime.toISOString();
                scope.destName = 'Test Dest';
                scope.destOutgoingTransportationID = '525cf20451979dea2c000002';
                scope.tripName = 'Test Trip';
                scope.updatedDestList = ['525a8422f6d0f87f0e000001', '525a8422f6d0f87f0e000003', '525a8422f6d0f87f0e000004', '525a8422f6d0f87f0e000005'];

                destination = new Destinations({
                    name: scope.destName
                });
                destination._id = '525a8422f6d0f87f0e000003';
                scope.destination = destination;
                
                trip = new Trips({
                    name: scope.tripName,
                    destinationList: ['525a8422f6d0f87f0e000001', '525a8422f6d0f87f0e000004', '525a8422f6d0f87f0e000005']
                });
                trip._id = $routeParams.tripId;
                scope.trip = trip;

                $httpBackend = _$httpBackend_;

                $location = _$location_;
            }));

            it('$scope.create() with valid form data should send a POST request to make a transportation ' +
                'then send a post request to make a destination then GET a trip then UPDATE the trip destination list ' +
                'then change the location to trips/:tripID', function() {

                    // set form data
                    scope.name = scope.destName;

                    // expected POST data
                    var postTransportationData = {
                            departureTime: scope.transDepartureTime,
                            information: scope.transInformation
                        };

                    // expected response data
                    var responseTransportationData = {
                            _id: scope.destOutgoingTransportationID,
                            information: scope.transInformation,
                            departureTime: scope.transDepartureTime
                        };

                    // expected POST data
                    var postDestinationData = {
                            name: scope.destName,
                            outgoingTransportationID: scope.destOutgoingTransportationID
                        };

                    // expected response data
                    var responseDestinationData = {
                            _id: scope.destination._id,
                            name: scope.destination.name,
                            outgoingTransportationID: scope.destOutgoingTransportationID
                        };

                    // expected response data
                    var responseTripData = {
                            _id: scope.trip._id,
                            name: scope.trip.name,
                            destinationList: scope.trip.destinationList
                        };

                    // expected PUT data
                    var putTripData = {
                            destinationList: scope.updatedDestList
                        };

                    // expected response data
                    var responseTripData2 = {
                            _id: scope.trip._id,
                            name: scope.trip.name,
                            destinationList: scope.updatedDestList
                        };

                    // test expected transportation POST request
                    $httpBackend.expectPOST(/trips\/([0-9a-fA-F]{24})\/destinations\/([0-9a-fA-F]{24})\/transportations$/, postTransportationData).respond(responseTransportationData);
                    // test expected destination POST request
                    $httpBackend.expectPOST(/trips\/([0-9a-fA-F]{24})\/destinations$/, postDestinationData).respond(responseDestinationData);
                    // test expected trip GET request
                    $httpBackend.expectGET(/trips\/([0-9a-fA-F]{24})$/).respond(responseTripData);
                    // test expected trip PUT request
                    $httpBackend.expectPUT(/trips\/([0-9a-fA-F]{24})$/).respond(responseTripData2);

                    // run controller
                    scope.create();
                    $httpBackend.flush();

                    // test scope values
                    expect(scope.transportation).toEqualData({
                        _id: scope.destOutgoingTransportationID,
                        information: scope.transInformation,
                        departureTime: scope.transDepartureTime
                    });
                    expect(scope.destination).toEqualData({
                        _id: scope.destination._id,
                        name: scope.destination.name,
                        outgoingTransportationID: scope.destOutgoingTransportationID
                    });
                    expect(scope.trip).toEqualData({
                        _id: scope.trip._id,
                        name: scope.trip.name,
                        destinationList: scope.updatedDestList
                    });
                    // test URL location to new object
                    expect($location.path()).toBe('/trips/' + scope.trip._id);

                });

        });
    });
}());