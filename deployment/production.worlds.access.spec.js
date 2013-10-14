var ProductionDatabase = require('../public/js/production.database');
var fs = require('fs');
var array = require('../public/js/utils/array.utils');

describe('Production Levels:', function() {
	
	var database;
	
	beforeEach(function() {
		database = new ProductionDatabase();
	});

	describe('world 1 access', function() {
		
		xit('lets player with empty portfolio play world 1', function() {
			expect(database.worlds[0].isOpenFor({})).toBe(true);
		});
		
		it('is locked when player has completed world 1', function() {
			var player = { portfolio: [] };
			array.forEach(database.worlds[0].levels, function(level) {
				player.portfolio.push(level.id);
			});
			expect(database.worlds[0].isOpenFor(player)).toBe(false);
		});

	});

	describe('world 2 access', function() {
		
		it('locks world 2 for player with empty portfolio', function() {
			expect(database.worlds[1].isOpenFor({})).toBe(false);
		});

		it('is unlocked when player has completed world 1', function() {
			var player = { portfolio: [] };
			array.forEach(database.worlds[0].levels, function(level) {
				player.portfolio.push(level.id);
			});
			expect(database.worlds[1].isOpenFor(player)).toBe(true);
		});

	});
	
});