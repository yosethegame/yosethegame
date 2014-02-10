var renderScore = require('./lib/render.score');

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
	
	describe('Without leading zeros', function() {
	
		it('simply renders the given number as a string', function() {
			expect(renderScore.withoutLeadingZeros(111)).toEqual('111');
		});
		
		it('renders 0', function() {
			expect(renderScore.withoutLeadingZeros(0)).toEqual('');
		});
		
		it('can handle undefined score', function() {
			expect(renderScore.withoutLeadingZeros(undefined)).toEqual('');
		});
		
		it('stops after 1e6', function() {
			expect(renderScore.withoutLeadingZeros(1234567)).toEqual('999999');		
		});
	});
	
	describe('Leading zeros', function() {
	
		it('complemente to 6 digits', function() {
			expect(renderScore.leadingZeros(111)).toEqual('000');
		});
		
		it('is empty when the number has 6 digits', function() {
			expect(renderScore.leadingZeros(123456)).toEqual('');
		});
		
		it('can complemente 0', function() {
			expect(renderScore.leadingZeros(0)).toEqual('000000');
		});
		
		it('can handle undefined score', function() {
			expect(renderScore.leadingZeros(undefined)).toEqual('000000');
		});

		it('stops after 1e6', function() {
			expect(renderScore.leadingZeros(1234567)).toEqual('');		
		});
	});
	
});