var PSql = require('../public/js/psql.database');
var pg = require('pg');

describe('PostgreSql database', function() {

	var url = process.env.DATABASE_URL;
	var database = new PSql(url);
	var client;
	
	var annessou = { 
		login: 'asm',
		name: 'annessou'
	};
	
	beforeEach(function(done) {
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
			database.save(annessou, function() {
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
			database.save(annessou, function() {
				database.find('asm', function(player) {
					expect(player.field).toEqual('any');
					done();
				});				
			});
		});
	});
	
});