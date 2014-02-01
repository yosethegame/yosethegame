var request 				= require('request');
var Server 					= require('../../public/js/server');
var tryAll 					= require('../../public/feature.try/try.request');
var DatabaseWithChallenges  = require('../support/database.with.levels');
var $ 						= require('jquery');
var logServer				= require('../../public/levels.common/log.server');
var thePlayer				= require('../../public/js/utils/player.utils');

describe("Trying to pass challenges >", function() {

	var server;
	var database;
	var annessou;
	var bilou;
	var clairette;
	var ericminio;

	beforeEach(function() {
		annessou = {
			login: 'annessou'
		};
		bilou = {
			login: 'bilou',
			score: 10,
			portfolio: [ {
				server: 'guiguilove',
				achievements: [ 1 ]
			} ]
		};
		clairette = {
			login: 'clairette',
			score: 10,
			portfolio: [ {
				server: 'http://localhost:6000',
				achievements: [ 1 ]
			} ]
		};
		ericminio = {
			login: 'ericminio',
			score: 30,
			portfolio: [ {
				server: 'http://localhost:6000',
				achievements: [ 1, 2, 3 ]
			} ]
		};
		
		database = new DatabaseWithChallenges();
		database.players = [ annessou, bilou, clairette, ericminio ];
		server = require('http').createServer(function(incoming, response) {
			tryAll(incoming, response, database);
		}).listen(5000);
	});

	afterEach(function() {
		server.close();
	});
	
	describe('Levels to try in a world', function() {
	
		var levels;
		
		describe('When the player is a new player,', function() {

			beforeEach(function() {
				levels = tryAll.allLevelsToTry(annessou, database.worlds[0], database.worlds[0].levels[0]);				
			});
			
			it('has just one level to try', function() {
				expect(levels.length).toEqual(1);				
			});
			
			it('is the first level', function() {
				expect(levels[0]).toEqual(database.worlds[0].levels[0]);
			});
		});
		
		describe('When the player has already done the first challenge,', function() {
			
			beforeEach(function() {
				levels = tryAll.allLevelsToTry(bilou, database.worlds[0], database.worlds[0].levels[1]);				
			});
			
			it('must try two challenges', function() {
				expect(levels.length).toEqual(2);				
			});
			
			it('must try the first challenge', function() {
				expect(levels[0]).toEqual(database.worlds[0].levels[0]);
			});
			
			it('must try the second challenge', function() {
				expect(levels[1]).toEqual(database.worlds[0].levels[1]);
			});
		});
		
		describe('When the player has reached level 2 of world 2', function() {
			
			beforeEach(function() {
				levels = tryAll.allLevelsToTry(ericminio, database.worlds[1], database.worlds[1].levels[1]);
			});
			
			it('has 2 challenges to try', function() {
				expect(levels.length).toEqual(2);				
			});
			
			it('must try the first challenge of world 2', function() {
				expect(levels[0]).toEqual(database.worlds[1].levels[0]);
			});
			
			it('must try the second challenge of world 2', function() {
				expect(levels[1]).toEqual(database.worlds[1].levels[1]);
			});

		});

	});
		
	describe('When player passes the first challenge,', function() {
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
    	it('returns json', function(done) {
			request("http://localhost:5000/try?login=annessou&server=http://localhost:6000&world=1&level=1", function(error, response, body) {
			    expect(response.headers['content-type']).toEqual('application/json');
				done();
			});			
    	});
		it('saves the server used by the player', function(done) {
			request("http://localhost:5000/try?login=annessou&server=http://localhost:6000&world=1&level=1", function(error, response, body) {
				database.find('annessou', function(player) {
					expect(player.portfolio[0].server).toEqual('http://localhost:6000');
					done();
				});
			});			
		});
		it('makes the challenge to be in the portfolio of the player', function(done) {
			request("http://localhost:5000/try?login=annessou&server=http://localhost:6000&world=1&level=1", function(error, response, body) {
				database.find('annessou', function(player) {
					expect(player.portfolio[0].achievements[0]).toEqual(database.worlds[0].levels[0].id)
					done();
				});
			});			
		});
		it('returns ok status', function(done) {
			request("http://localhost:5000/try-all-up-to?login=annessou&server=http://localhost:6000&world=1&level=1", function(error, response, body) {
				expect(response.statusCode).toEqual(200);
				done();
			});			
		});
		it('returns detailed content for success', function(done) {
			request("http://localhost:5000/try?login=annessou&server=http://localhost:6000&world=1&level=1", function(error, response, body) {
				expect(body).toContain(JSON.stringify([
						{
							id: database.worlds[0].levels[0].id,
							title: database.worlds[0].levels[0].title,
							code: 200,
							expected: 'a correct expected value',
							got: 'a correct actual value'
						}
					]					
				));
				done();
			});			
		});
		it('returns the new score of the player', function(done) {
			request("http://localhost:5000/try?login=annessou&server=http://localhost:6000&world=1&level=1", function(error, response, body) {
				expect(body).toContain('"score":10');
				done();
			});			
		});
	});
	
	describe('When player passes the second challenge', function() {
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
		it('does not update the server of the player', function(done) {
			request("http://localhost:5000/try?login=bilou&server=http://localhost:6000&world=1&level=2", function(error, response, body) {
				database.find('bilou', function(player) {
					expect(player.portfolio[0].server).toEqual('guiguilove');
					done();
				});
			});			
		});
		it('makes the second challenge to be in the portfolio of the player', function(done) {
			request("http://localhost:5000/try?login=clairette&world=1&level=2", function(error, response, body) {
				database.find('clairette', function(player) {
					expect(player.portfolio[0].achievements[1]).toEqual(database.worlds[0].levels[1].id)
					done();
				});
			});			
		});
	});		
	
	describe("When no remote server answers, ", function() {

		beforeEach(function() {
			database.worlds[0].levels[0].checker = '../../test/support/response.always.404'
		});

		it("returns normally", function(done) {
			request("http://localhost:5000/try?login=annessou&server=http://localhost:6000&world=1&level=1", function(error, response, body) {
				expect(response.statusCode).toEqual(200);
				done();
			});
		});
		it('returns detailed error for 404', function(done) {
			request("http://localhost:5000/try?login=annessou&server=http://localhost:6000&world=1&level=1", function(error, response, body) {
				expect(body).toContain(JSON.stringify([
						{
							id: database.worlds[0].levels[0].id,
							title: database.worlds[0].levels[0].title,
							code: 404,
							expected: 'a correct expected value',
							got: 'un incorrect value'
						}
					]					
				));
				done();
			});			
		});
		it('support when no server is provided', function(done) {
			request("http://localhost:5000/try-all-up-to?login=annessou&world=1&level=1", function(error, response, body) {
				expect(body).toContain(JSON.stringify([
						{
							id: database.worlds[0].levels[0].id,
							title: database.worlds[0].levels[0].title,
							code: 404,
							expected: 'a correct expected value',
							got: 'un incorrect value'
						}
					]					
				));
				done();
			});			
		});
		it('returns the unchanged score of the player', function(done) {
			request("http://localhost:5000/try?login=annessou&server=http://localhost:6000&world=1&level=1", function(error, response, body) {
				expect(body).toContain('"score":0');
				done();
			});			
		});
	});
	
	describe("Player's server use", function() {
		var remote;
		beforeEach(function(done) {
			remote = require('http').createServer(
				function (request, response) {
					response.end();
				})
			.listen(6000);
			database.find('bilou', function(player) {
				logServer(player, 'http://localhost:6000');
				database.savePlayer(player, function() {
					done();
				})
			});
		});
		afterEach(function() {
			remote.close();
		});
	
		it('uses the already known server of the player even if provided', function(done) {
			request("http://localhost:5000/try?login=bilou&server=any&world=1&level=1", function(error, response, body) {
				var content = $.parseJSON(body);
				expect(content.results[0].code).toEqual(200);
				done();
			});			
		});
		
		it('supports when no server is provided', function(done) {
			request("http://localhost:5000/try?login=bilou&world=1&level=1", function(error, response, body) {
				var content = $.parseJSON(body);
				expect(content.results[0].code).toEqual(200);
				done();
			});			
		});
	});
	
	describe("Trying the second challenge means trying both the first and the second", function() {
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
	
		it('returns detailed content for success', function(done) {
			request("http://localhost:5000/try?login=clairette&world=1&level=2", function(error, response, body) {
				expect(body).toContain(JSON.stringify([
						{
							id: database.worlds[0].levels[0].id,
							title: database.worlds[0].levels[0].title,
							code: 200,
							expected: 'a correct expected value',
							got: 'a correct actual value'
						},
						{
							id: database.worlds[0].levels[1].id,
							title: database.worlds[0].levels[1].title,
							code: 200,
							expected: 'a correct expected value',
							got: 'a correct actual value'
						}
					]					
				));
				done();
			});			
		});
		it('only adds the second challenge in the portfolio and not two times the first', function(done) {
			request("http://localhost:5000/try?login=clairette&world=1&level=2", function(error, response, body) {
				database.find('clairette', function(player) {
					expect(player.portfolio[0].achievements.length).toEqual(2);
					expect(player.portfolio[0].achievements[1]).toEqual(database.worlds[0].levels[1].id);
					done();
				});
			});			
		});
		it('returns the new score of the player', function(done) {
			request("http://localhost:5000/try?login=clairette&world=1&level=1", function(error, response, body) {
				expect(body).toContain('"score":20');
				done();
			});			
		});
	});
	
	describe('Regressions:', function() {
		
		var remote;
		beforeEach(function(done) {
			remote = require('http').createServer(
				function (request, response) {
					response.end();
				})
			.listen(6000);
			database.find('bilou', function(player) {
				logServer(player, 'http://localhost:6000');
				database.savePlayer(player, function() {
					done();
				})
			});
		});
		afterEach(function() {
			remote.close();
		});
	
		it('considering a player with 1 challenge in his portfolio', function(done) {
			database.find('bilou', function(player) {
				expect(player.portfolio[0].achievements.length).toEqual(1);
				done();
			});
		});
		
		describe('When there is no regression,', function() {
			
			it('makes the next challenge to be in the portfolio of the player', function(done) {
				request("http://localhost:5000/try?login=bilou&world=1&level=2", function(error, response, body) {
					database.find('bilou', function(player) {
						expect(player.portfolio[0].achievements.length).toEqual(2);
						done();
					});
				});			
			});
		});
		
		describe('When there is a regression,', function() {
		
			beforeEach(function() {
				database.worlds[0].levels[0].checker = '../../test/support/response.always.404';
			});
			
			it('does not consider the next challenge as passing', function(done) {
				request("http://localhost:5000/try?login=bilou&world=1&level=2", function(error, response, body) {
					database.find('bilou', function(player) {
						expect(player.portfolio[0].achievements.length).toEqual(1);
						done();
					});
				});			
			});			
			
		});
		
	});
	
});

