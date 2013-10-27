var ProductionDatabase 	= require('../public/js/production.database');
var array 				= require('../public/js/utils/array.utils');

describe('World 2', function() {
	
	var world;
	
	beforeEach(function() {
		var database = new ProductionDatabase();
		world = database.worlds[1];
	});

	it('is locked for players with empty portfolio', function() {
		expect(world.isOpenFor({})).toBe(false);
	});

	it('is unlocked when player has completed level id:1', function() {
		var player = { portfolio: [ { server: 'any', achievements: [1] } ] };

		expect(world.isOpenFor(player)).toBe(true);
	});

});