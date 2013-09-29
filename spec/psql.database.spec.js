var PSql = require('../public/js/psql.database');
var pg = require('pg');

describe('PostgreSql database', function() {

	var url = process.env.DATABASE_URL;
	var database = new PSql(url);
	var client;
	var annessou;
	
	beforeEach(function(done) {
		annessou = { 
			login: 'asm',
			name: 'annessou'
		};

		client = new pg.Client(url);
		client.connect(function(err) {
			client.query('drop table players', function(err, result) {
				client.query('create table players(login varchar(50), json varchar(5000))', function(err, result) {
					client.end();
					expect(err).toEqual(null);
					done();
				});			
			});			
		});
		
	});
	
	afterEach(function(done) {
		database.deletePlayer(annessou, function() {
			done();
		})
	});

	it('uses process.env.DATABASE_URL', function() {
		expect(url).toEqual(process.env.DATABASE_URL);
	});
	
	it('enjoys a env var', function() {
		expect(url).toBeDefined();
	});

	it('can create a player', function(done) {
		database.createPlayer(annessou, function() {
			database.find('asm', function(player) {
				expect(player.name).toEqual('annessou');
				done();
			});
		});
	});
		
	it('preserves an already existing player', function(done) {
		database.createPlayer(annessou, function() {
			annessou.name = 'new name';
			database.createPlayer(annessou, function() {
				database.find('asm', function(player) {
					expect(player.name).toEqual('annessou');
					done();
				});
			});
		});
	});
		
	it('does not create extra players', function(done) {
		database.createPlayer(annessou, function() {
			annessou.name = 'new name';
			database.createPlayer(annessou, function() {
					
				var client = new pg.Client(url);
				client.connect(function(err) {
					var sql = "select count(1) from players where login = 'asm'";
					client.query(sql, function(err, result) {
						client.end();
						expect(result.rows[0].count).toEqual('1');
						done();
					});
				});
					
			});
		});
	});
		
	it('can modify a field', function(done) {
		database.createPlayer(annessou, function() {
			annessou.name = 'anne-sophie';
			database.savePlayer(annessou, function() {
				database.find('asm', function(player) {
					expect(player.name).toEqual('anne-sophie');
					done();
				});				
			});
		});
	});	
	
	it('can add a new field', function(done) {
		database.createPlayer(annessou, function() {
			annessou.field = 'any';
			database.savePlayer(annessou, function() {
				database.find('asm', function(player) {
					expect(player.field).toEqual('any');
					done();
				});				
			});
		});
	});
	
	it('returns undefined when the player is unknown', function(done) {
		database.find('any', function(player) {
			expect(player).toEqual(undefined);
			done();
		});				
	});
	
	describe('Retrieving all players', function() {
		
		it('is possible', function(done) {
			database.createPlayer(annessou, function() {
				database.allPlayers(function(players) {
					expect(players.length).toEqual(1);
					done();
				});
			});
		});

		it('returns full players', function(done) {
			annessou.field = 'any';
			database.createPlayer(annessou, function() {
				database.allPlayers(function(players) {
					expect(players[0].field).toEqual('any');
					done();
				});
			});
		});
		
		it('returns empty collection when there is no player', function(done) {
			database.allPlayers(function(players) {
				expect(players.length).toEqual(0);
				done();
			});
		});
	});
	
	it('can delete a player', function(done) {
		database.createPlayer(annessou, function() {
			database.deletePlayer(annessou, function() {
				database.find('asm', function(player) {
					expect(player).toEqual(undefined);
					done();
				});								
			});
		});
	});
	
});