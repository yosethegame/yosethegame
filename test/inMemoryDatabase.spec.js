var InMemoryDatabase = require('../public/js/inMemoryDatabase');

describe('InMemoryDatabase', function() {

	var database;
	
	beforeEach(function() {
		database = new InMemoryDatabase();
	});

	it('has an empty player collection by default', function() {
		expect(database.players.length).toEqual(0);
	});
	
	it('offers a way to find a player by login', function() {
		database.players = [
			{ login: 'one', name: 'ricou' },
			{ login: 'two', name: 'annessou' }
		];
		expect(database.find('two').name).toEqual('annessou');
	});
	
	it('offers a friendly way to populate players', function() {
		var me = { login: 'me' };
		var database = new InMemoryDatabase().withPlayers([me]);
		
		expect(database.players[0]).toEqual(me);
	});
	
});