var Requester = require('./lib/emergency.requester');

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

        it('is made of elements containing a map', function() {
            array.forEach(requester.candidates, function(candidate) {
                expect(candidate.map).toBeDefined();
            });
        });
    });
});
