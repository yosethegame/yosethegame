var request 				= require('request');
var Server 					= require('../app/lib/server');
var tryAll 					= require('../app/features/feature.try/lib/try.request');
var PSql 					= require('../app/lib/psql.database');
var $ 						= require('jquery');
var DatabaseWithChallenges 	= require('../app/support/database.with.levels');

describe("Trying to pass challenges >", function() {

	var server;
	var database;
	var ericminio;

	beforeEach(function(done) {				
		database = new PSql(process.env.DATABASE_URL);
		database.worlds = new DatabaseWithChallenges().worlds;
		ericminio = {
			login: 'ericminio',			
			portfolio: [ { 
				server: 'http://localhost:6000', 
				achievements: [database.worlds[0].levels[0].id] 
			} ]
		};
		database.deletePlayer(ericminio, function() {
			database.createPlayer(ericminio, function() {				
				server = require('http').createServer(function(incoming, response) {
					tryAll(incoming, response, database);
				}).listen(5000);
				done();
			});
		});		
	});

	afterEach(function(done) {
		server.close();
		database.deletePlayer(ericminio, function() {
			done();
		});
	});
	
	describe('Regressions:', function() {
		
		var remote;
		beforeEach(function() {
			remote = require('http').createServer(
				function (request, response) {
					response.end();
				})
			.listen(6000);
		});
		afterEach(function() {
			remote.close();
		});
	
		it('considering a player with 1 challenges in his portfolio', function(done) {
			database.find('ericminio', function(player) {
				expect(player.portfolio[0].achievements.length).toEqual(1);
				done();
			});
		});
		
		describe('When there is no regression,', function() {
			
			it('makes the next challenge to be in the portfolio of the player', function(done) {
				request("http://localhost:5000/try?login=ericminio&world=1&level=2", function(error, response, body) {
					database.find('ericminio', function(player) {
						expect(player.portfolio[0].achievements.length).toEqual(2);
						done();
					});
				});			
			});
		});
		
		describe('When there is a regression,', function() {
		
			beforeEach(function() {
				database.worlds[0].levels[0].checker = '../../../../app/support/response.always.404';
			});
			
			it('does not consider the next challenge as passing', function(done) {
				request("http://localhost:5000/try?login=ericminio&world=1&level=2", function(error, response, body) {
					database.find('ericminio', function(player) {
						expect(player.portfolio[0].achievements.length).toEqual(1);
						done();
					});
				});			
			});			
			
		});
		
	});
});

