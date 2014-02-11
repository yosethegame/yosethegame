var ProductionDatabase  = require('./lib/production.database');
var array               = require('./utils/lib/array.utils');

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
		var player = { portfolio: [ { server: 'any', achievements: [] } ] };
		array.forEach(world.levels, function(level) {
			player.portfolio[0].achievements.push(level.id);
		});
		expect(world.isOpenFor(player)).toBe(true);
	});
	
});