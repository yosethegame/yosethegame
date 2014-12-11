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
		
		beforeEach(function() {
			requester = new Requester('this-server');            
		});
		
		it('points to the fire fighter url', function() {
            requester.map = function() { return [ 'AWONDER', 'FULMAP!']; };
            url = requester.url();
			
			expect(url).toEqual('this-server/fire/geek?width=7&map=AWONDERFULMAP!');
		});
		
		it('uses a map function', function() {
			expect(requester.map).toBeDefined();
		});
		
		it('uses one of the candidates', function() {
			var map = ['ANY', 'MAP'];
			requester.candidates = [ { map: map } ];
			
			expect(requester.map()).toEqual(map);
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
			
			it('is an array with at least two lines', function() {
				array.forEach(requester.candidates, function(candidate) {
					expect(candidate.map instanceof Array).toBe(true);
					expect(candidate.map.length).toBeGreaterThan(1);
				});
			});
			
			it('is a rectangle', function() {
				array.forEach(requester.candidates, function(candidate) {
					var expectedWidth = candidate.map[0].length;
					array.forEach(candidate.map, function(line) {
						expect(line.length).toEqual(expectedWidth);
					});
				});
			});
			
			it('has a plane', function() {
				array.forEach(requester.candidates, function(candidate) {
					expect(candidate.map.join('')).toContain('P');
				});
			});

			it('has a fire', function() {
				array.forEach(requester.candidates, function(candidate) {
					expect(candidate.map.join('')).toContain('F');
				});
			});

			it('has at least two points of water', function() {
				array.forEach(requester.candidates, function(candidate) {
					var map = candidate.map.join('');

					expect(map).toContain('W');
					var afterOneWaterRemoved = map;
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
					expect(count).not.toBeGreaterThan(1);
				});
			});
		});
		
		describe('expectedMoveCount', function() {
			
			it('exist for each candidate', function() {

				array.forEach(requester.candidates, function(candidate) {
					expect(candidate.expectedMoveCount).toBeDefined();
				});
			});
			
			it('is greater than 1 to be realistic', function() {
				
				array.forEach(requester.candidates, function(candidate) {
					expect(candidate.expectedMoveCount).toBeGreaterThan(1);
				});
			});
		});
    });
	
    describe('Candidate choice', function() {

        it('is random', function() {
            var first = requester.candidateIndex();
            var different = false;
            array.forEach([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(index) {
                different = different || (requester.candidateIndex() !== first);
            });

            expect(different).toEqual(true);
        });

        it('is made in the candidate list range', function() {
            var outOfRange = false;
            array.forEach([1, 2, 3, 4, 5], function(index) {
                var candidateIndex = requester.candidateIndex();
                outOfRange = outOfRange || (candidateIndex >= requester.candidates.length);
            });

            expect(outOfRange).toBe(false);
        });
    });
});
