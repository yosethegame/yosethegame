var ProductionDatabase 	= require('../public/js/production.database');
var array 				= require('../public/js/utils/array.utils');

describe('Worlds', function() {
	
	var database;
	
	beforeEach(function() {
		database = new ProductionDatabase();
	});

	it('must have a name', function() {
		array.forEach(database.worlds, function(world) {
			expect(world.name).toBeDefined();
		});
	});
	
	it('must have at least one level', function() {
		array.forEach(database.worlds, function(world) {
			expect(world.levels.length).toBeGreaterThan(0);
		});
	});
	
	it('must have a isOpenFor(player) api', function() {
		array.forEach(database.worlds, function(world) {
			expect(typeof world.isOpenFor).toEqual('function');
		});
	});
	
	describe('isOpenFor', function() {
	    
	    it('must be the common one', function() {
    		array.forEach(database.worlds, function(world) {
    			expect(world.isOpenFor).toBe(ProductionDatabase.isWorldOpenFor);
    		});
	    });    
	});
});