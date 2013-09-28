var renderScore = require('../../public/js/utils/render.score');

describe('Score rendering', function() {

	it('can render 2-digits score', function() {
		expect(renderScore(10)).toEqual('000010');		
	});
	
	it('can render a score of 0', function() {
		expect(renderScore(0)).toEqual('000000');		
	});
	
	it('can render an undefined score', function() {
		expect(renderScore(undefined)).toEqual('000000');		
	});

	it('can render 3-digits score', function() {
		expect(renderScore(111)).toEqual('000111');		
	});
	
	it('can render a 6-digits score', function() {
		expect(renderScore(123456)).toEqual('123456');		
	});
	
	it('stops after 1e6', function() {
		expect(renderScore(1234567)).toEqual('999999');		
	});
	
});