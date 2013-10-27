var ProductionDatabase 	= require('../public/js/production.database');
var array 				= require('../public/js/utils/array.utils');

describe('World 1', function() {
	
	var world;
	
	beforeEach(function() {
		var database = new ProductionDatabase();
		world = database.worlds[0];
	});

	it('is open to players with empty portfolio', function() {
		expect(world.isOpenFor({})).toBe(true);
	});
		
	it('is always unlocked even if world 1 is completed', function() {
		var player = { portfolio: [] };
		array.forEach(world.levels, function(level) {
			player.portfolio.push(level.id);
		});
		expect(world.isOpenFor(player)).toBe(true);
	});
	
});