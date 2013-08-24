var ProductionFileDatabase = require('../public/js/productionFileDatabase');
var FileDatabase = require('../public/js/fileDatabase');
var fs = require('fs');

describe('Production FileDatabase', function() {
	
	it('inherits from fileDatabase targeting player folder', function() {
		expect(ProductionFileDatabase.prototype).toEqual(new FileDatabase('players'));
	});
	
	it('does not override target folder', function() {
		expect(new ProductionFileDatabase().folder).toEqual('players');
	});
	
	describe('First challenge', function() {
		var challenge;
		
		beforeEach(function() {
			challenge = new ProductionFileDatabase().challenges[0];
		});
		
		it('has an invitating name', function() {
			expect(challenge.title).toEqual('Get ready');
		});
		
		it('is the ping challenge', function() {
			expect(challenge.file).toEqual('public/challenge.ping/ping.html');
		});
		
		it('checks that the file exists', function() {
			expect(fs.existsSync(challenge.file)).toBe(true);
		});
	});
	
	describe('Second challenge', function() {
		var challenge;
		
		beforeEach(function() {
			challenge = new ProductionFileDatabase().challenges[1];
		});
		
		it('has an invitating name', function() {
			expect(challenge.title).toEqual('Power of two challenge');
		});
		
		it('is the power.of.two challenge', function() {
			expect(challenge.file).toEqual('public/challenge.primeFactors/power.of.two.html');
		});
		
		it('checks that the file exists', function() {
			expect(fs.existsSync(challenge.file)).toBe(true);
		});
	});
	
});