var InMemoryDatabase = require('./inMemoryDatabase');

describe('InMemoryDatabase', function() {

	var database;
	
	beforeEach(function() {
		database = new InMemoryDatabase();
	});

	it('has an empty player collection by default', function() {
		expect(database.players.length).toEqual(0);
	});
	
	it('offers a way to find a player by login', function(done) {
		database.players = [
			{ login: 'one', name: 'ricou' },
			{ login: 'two', name: 'annessou' }
		];
		database.find('two', function(player) {
			expect(player.name).toEqual('annessou');
			done();
		});
	});
	
	it('offers a friendly way to populate players', function() {
		var me = { login: 'me' };
		var database = new InMemoryDatabase().withPlayers([me]);
		
		expect(database.players[0]).toEqual(me);
	});
	
	it('updating a player needs no implementation thx to in-memory db', function(done) {
		var me = { login: 'me' };
		var database = new InMemoryDatabase().withPlayers([me]);
		me.name = 'eric';
		database.savePlayer(me, function(player) {
			database.find('me', function(player) {
				expect(player.name).toEqual('eric');
				done();
			});
		});		
	});
	
	it('offers a way to retrieves all the players', function(done) {
		database.players = [
			{ login: 'one', name: 'ricou' },
			{ login: 'two', name: 'annessou' }
		];
		database.allPlayers(function(players) {
			expect(players.length).toEqual(2);
			done();
		});
	});
	
	it('offers a way to create a player', function(done) {
		var me = { login: 'me', field: 'any' };
		database.createPlayer(me, function() {
			database.find('me', function(player) {
				expect(player.field).toEqual('any');
				done();
			});
		});
	});
	
});