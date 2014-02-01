var ProductionDatabase 	= require('../public/js/production.database');
var array 				= require('../public/js/utils/array.utils');

describe('World 4', function() {
	
	var world;
	
	beforeEach(function() {
		var database = new ProductionDatabase();
		world = database.worlds[3];
	});

	it('is locked for players with empty portfolio', function() {
		expect(world.isOpenFor({})).toBe(false);
	});

	it('is unlocked when player has completed level id:25', function() {
		var player = { portfolio: [ { server: 'any', achievements: [25] } ] };

		expect(world.isOpenFor(player)).toBe(true);
	});

});