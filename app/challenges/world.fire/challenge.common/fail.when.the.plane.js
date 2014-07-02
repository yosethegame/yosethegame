var json200 = require('../../common/lib/json200');

module.exports = {
	
	neverTakesWater : function(matcher) {
		
		describe(matcher.name + ' > When the plane never takes water,', function() {
        
			beforeEach(function(done) {
				var request = 'http://localhost:6000/fire/api?width=2&map=PW.F';
				var remoteAnswer = JSON.stringify({
					map: [
						"PW",
						".F"
					],
					moves: [
						{ dx:0, dy:1 },
						{ dx:1, dy:0 },
					]
				});

				matcher.validate(request, json200, remoteAnswer, function(receivedStatus) {
					status = receivedStatus;
					done();
				});
			});

			it('sets code to 501', function() {
				expect(status.code).toEqual(501);
			});

			it('sets expected', function() {
				expect(status.expected).toContain('plane must first take water and then reach the fire');
			});

			it('sets actual', function() {
				expect(status.got).toContain('plane never took water');
			});
		});
	},
	
	neverReachesTheFire : function(matcher) {
	
		describe(matcher.name + ' > When the plane never reaches the fire,', function() {
        
			beforeEach(function(done) {
				var request = 'http://localhost:6000/fire/api?width=2&map=PW.F';
				var remoteAnswer = JSON.stringify({
					map: [
						"PW",
						".F"
					],
					moves: [
						{ dx:1, dy:0 },
					]
				});

				matcher.validate(request, json200, remoteAnswer, function(receivedStatus) {
					status = receivedStatus;
					done();
				});
			});

			it('sets code to 501', function() {
				expect(status.code).toEqual(501);
			});

			it('sets expected', function() {
				expect(status.expected).toContain('plane must first take water and then reach the fire');
			});

			it('sets actual', function() {
				expect(status.got).toContain('plane never reached the fire');
			});
		});	
	},
	
	reachesTheFireBeforeTakingWater : function(matcher) {
	
		describe(matcher.name + ' > When the plane reaches the fire before taking water,', function() {

			beforeEach(function(done) {
				var request = 'http://localhost:6000/fire/api?width=2&map=PW.F';
				var remoteAnswer = JSON.stringify({
					map: [
						"PW",
						".F"
					],
					moves: [
						{ dx:0, dy:1 },
						{ dx:1, dy:0 },
						{ dx:0, dy:-1 },
					]
				});

				matcher.validate(request, json200, remoteAnswer, function(receivedStatus) {
					status = receivedStatus;
					done();
				});
			});

			it('sets code to 501', function() {
				expect(status.code).toEqual(501);
			});

			it('sets expected', function() {
				expect(status.expected).toContain('plane must first take water and then reach the fire');
			});

			it('sets actual', function() {
				expect(status.got).toContain('plane reached the fire without water');
			});
		});
	},
};