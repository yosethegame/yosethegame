var Requester = require('./lib/emergency.requester');
var array = require('../../../utils/lib/array.utils');

describe('Emergency challenge requester', function() {
	
	var requester;
	
	beforeEach(function() {
		requester = new Requester('this-server');
	});
	
	it('suppresses training slash from the given server url', function() {
        expect(new Requester('this-url/').server).toEqual('this-url');
	});
	
	describe('target url', function() {
		
		var url;
		
		beforeEach(function() {
            requester.mapWidth = function() { return 2; };
            requester.map = function() { return "AWONDERFULMAP"; };

            url = requester.url();
		});
		
		it('points to the fire fighter url', function() {
			expect(url).toEqual('this-server/fire/geek?width=2&map=AWONDERFULMAP');
		});
		
	});
	
	describe('Candidate list > ', function() {

        it('is not empty', function() {
            expect(requester.candidates.length).toBeGreaterThan(3);
        });
		
		describe('map', function() {
			
			it('exists for each candidate', function() {
				array.forEach(requester.candidates, function(candidate) {
					expect(candidate.map).toBeDefined();
				});
			});

			it('has a plane', function() {
				array.forEach(requester.candidates, function(candidate) {
					expect(candidate.map).toContain('P');
				});
			});

			it('has a fire', function() {
				array.forEach(requester.candidates, function(candidate) {
					expect(candidate.map).toContain('F');
				});
			});

			it('has at least two points of water', function() {
				array.forEach(requester.candidates, function(candidate) {
					expect(candidate.map).toContain('W');
					var afterOneWaterRemoved = candidate.map;
					var index = afterOneWaterRemoved.indexOf('W');
					afterOneWaterRemoved = afterOneWaterRemoved.substr(0, index) + afterOneWaterRemoved.substr(index+1);

					expect(afterOneWaterRemoved).toContain('W');
				});
			});

			it('is unique in the list of candidates', function() {
				array.forEach(requester.candidates, function(candidate) {
					var count = 0;
					array.forEach(requester.candidates, function(item) {
						if (item.map == candidate.map) {
							count ++;
						}
					});
					if (count > 1) {
						throw "Map " + candidate.map + " found more than once";
					}
				});
			});
		});
		
        it('is made of elements containing the width of the map', function() {
            array.forEach(requester.candidates, function(candidate) {
                expect(candidate.width).toBeDefined();
            });
        });
		
		describe('expected result', function() {

			it('exists for each candidate', function() {
				array.forEach(requester.candidates, function(candidate) {
					expect(candidate.expectedResponse).toBeDefined();
				});
			});			
		});
    });
});
