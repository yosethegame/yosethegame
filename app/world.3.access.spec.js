var ProductionDatabase  = require('./lib/production.database');
var array               = require('./utils/lib/array.utils');

describe('World 3', function() {
	
	var world;
	
	beforeEach(function() {
		var database = new ProductionDatabase();
		world = database.worlds[2];
	});

	it('is locked for players with empty portfolio', function() {
		expect(world.isOpenFor({})).toBe(false);
	});

	it('is unlocked when player has completed level id:1', function() {
		var player = { portfolio: [ { server: 'any', achievements: [1] } ] };

		expect(world.isOpenFor(player)).toBe(true);
	});

});