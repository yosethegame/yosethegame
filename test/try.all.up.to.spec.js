var request = require('request');
var Server = require('../public/js/server');
var tryAll = require('../public/js/try-all-up-to');
var InMemoryDatabase = require('./support/inMemoryDatabase');
var $ = require('jquery');

describe("Trying to pass challenges >", function() {

	var server;
	var database;
	var annessou;
	var bilou;
	var clairette;
	var ericminio;

	var challenge11;
	var challenge12;
	var challenge21;
	var challenge22;

	beforeEach(function() {
		annessou = {
			login: 'annessou'
		};
		bilou = {
			login: 'bilou',
			score: 10,
			server: 'guiguilove',
			portfolio: [ { title: 'challenge 1.1' } ]
		};
		clairette = {
			login: 'clairette',
			score: 10,
			server: 'http://localhost:6000',
			portfolio: [ { title: 'challenge 1.1' } ]
		};
		ericminio = {
			login: 'ericminio',
			score: 30,
			server: 'http://localhost:6000',
			portfolio: [ { title: 'challenge 1.1' }, { title: 'challenge 1.2' }, { title: 'challenge 2.1' } ]
		};
		
		challenge11 = {
			title: 'challenge 1.1',
			file: 'thisFile',
			checker: '../../test/support/response.always.valid',
			requester: '../../test/support/empty.request',
		};
		challenge12 = {
			title: 'challenge 1.2',
			file: 'secondFile',
			checker: '../../test/support/response.always.valid',
			requester: '../../test/support/empty.request',
		};
		challenge21 = {
			title: 'challenge 2.1',
			file: 'thisFile',
			checker: '../../test/support/response.always.valid',
			requester: '../../test/support/empty.request',
		};
		challenge22 = {
			title: 'challenge 2.2',
			file: 'secondFile',
			checker: '../../test/support/response.always.valid',
			requester: '../../test/support/empty.request',
		};
		
		database = new InMemoryDatabase();
		database.players = [ annessou, bilou, clairette, ericminio ];
		database.levels = [
			{
				number: 1,
				name: 'level 1',
				challenges: [ challenge11, challenge12 ]
			},
			{
				number: 2,
				name: 'level 2',
				challenges: [ challenge21, challenge22 ]
			}
		];
		server = require('http').createServer(function(incoming, response) {
			tryAll(incoming, response, database);
		}).listen(5000);
	});

	afterEach(function() {
		server.close();
	});
	
	describe("When no remote server answers, ", function() {

		beforeEach(function() {
			database.levels[0].challenges[0].checker = '../../test/support/response.always.404'
		});

		it("returns normally", function(done) {
			request("http://localhost:5000/try-all-up-to?login=annessou&server=http://localhost:6000", function(error, response, body) {
				expect(response.statusCode).toEqual(200);
				done();
			});
		});
		it('returns detailed error for 404', function(done) {
			request("http://localhost:5000/try-all-up-to?login=annessou&server=http://localhost:6000", function(error, response, body) {
				expect(body).toContain(JSON.stringify([
						{
							challenge: 'challenge 1.1',
							code: 404,
							expected: 'a correct expected value',
							got: 'undefined'
						}
					]					
				));
				done();
			});			
		});
		it('support when no server is provided', function(done) {
			request("http://localhost:5000/try-all-up-to?login=annessou", function(error, response, body) {
				expect(body).toContain(JSON.stringify([
						{
							challenge: 'challenge 1.1',
							code: 404,
							expected: 'a correct expected value',
							got: 'undefined'
						}
					]					
				));
				done();
			});			
		});
		it('returns the unchanged score of the player', function(done) {
			request("http://localhost:5000/try-all-up-to?login=annessou&server=http://localhost:6000", function(error, response, body) {
				expect(body).toContain('"score":0');
				done();
			});			
		});
	});
	
	describe('When player passes the first challenge', function() {
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
		it('saves the server used by the player', function(done) {
			request("http://localhost:5000/try-all-up-to?login=annessou&server=http://localhost:6000", function(error, response, body) {
				database.find('annessou', function(player) {
					expect(player.server).toEqual('http://localhost:6000');
					done();
				});
			});			
		});
		it('makes the challenge to be in the portfolio of the player', function(done) {
			database.levels[0].challenges[0].title = 'Get ready for fun :)';
			request("http://localhost:5000/try-all-up-to?login=annessou&server=http://localhost:6000", function(error, response, body) {
				database.find('annessou', function(player) {
					expect(player.portfolio[0].title).toEqual('Get ready for fun :)')
					done();
				});
			});			
		});
		it('returns ok status', function(done) {
			request("http://localhost:5000/try-all-up-to?login=annessou&server=http://localhost:6000", function(error, response, body) {
				expect(response.statusCode).toEqual(200);
				done();
			});			
		});
		it('returns detailed content for success', function(done) {
			request("http://localhost:5000/try-all-up-to?login=annessou&server=http://localhost:6000", function(error, response, body) {
				expect(body).toContain(JSON.stringify([
						{
							challenge: 'challenge 1.1',
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
			request("http://localhost:5000/try-all-up-to?login=annessou&server=http://localhost:6000", function(error, response, body) {
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
			request("http://localhost:5000/try-all-up-to?login=bilou&server=http://localhost:6000", function(error, response, body) {
				database.find('bilou', function(player) {
					expect(player.server).toEqual('guiguilove');
					done();
				});
			});			
		});
		it('makes the second challenge to be in the portfolio of the player', function(done) {
			database.levels[0].challenges[1].title = 'Get ready for fun :)';
			request("http://localhost:5000/try-all-up-to?login=clairette", function(error, response, body) {
				database.find('clairette', function(player) {
					expect(player.portfolio[1].title).toEqual('Get ready for fun :)')
					done();
				});
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
				player.server = 'http://localhost:6000';
				database.savePlayer(player, function() {
					done();
				})
			});
		});
		afterEach(function() {
			remote.close();
		});
	
		it('uses the already known server of the player even if provided', function(done) {
			request("http://localhost:5000/try-all-up-to?login=bilou&server=any", function(error, response, body) {
				var content = $.parseJSON(body);
				expect(content.results[0].code).toEqual(200);
				done();
			});			
		});
		
		it('supports when no server is provided', function(done) {
			request("http://localhost:5000/try-all-up-to?login=bilou", function(error, response, body) {
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
			request("http://localhost:5000/try-all-up-to?login=clairette", function(error, response, body) {
				expect(body).toContain(JSON.stringify([
						{
							challenge: 'challenge 1.1',
							code: 200,
							expected: 'a correct expected value',
							got: 'a correct actual value'
						},
						{
							challenge: 'challenge 1.2',
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
			request("http://localhost:5000/try-all-up-to?login=clairette", function(error, response, body) {
				database.find('clairette', function(player) {
					expect(player.portfolio.length).toEqual(2);
					expect(player.portfolio[1].title).toEqual('challenge 1.2');
					done();
				});
			});			
		});
		it('returns the new score of the player', function(done) {
			request("http://localhost:5000/try-all-up-to?login=clairette", function(error, response, body) {
				expect(body).toContain('"score":20');
				done();
			});			
		});
	});
	
	describe('Challenges to try:', function() {
	
		var challenges;
		
		describe('When the player is a new player,', function() {

			beforeEach(function() {
				challenges = tryAll.allChallengesToTry(annessou, database);				
			});
			
			it('has just one challenge to try', function() {
				expect(challenges.length).toEqual(1);				
			});
			
			it('is the first challenge', function() {
				expect(challenges[0]).toEqual(challenge11);
			});
		});
		
		describe('When the player has already done the first challenge,', function() {
			
			beforeEach(function() {
				challenges = tryAll.allChallengesToTry(bilou, database);				
			});
			
			it('must try two challenges', function() {
				expect(challenges.length).toEqual(2);				
			});
			
			it('must try the first challenge', function() {
				expect(challenges[0]).toEqual(challenge11);
			});
			
			it('must try the second challenge', function() {
				expect(challenges[1]).toEqual(challenge12);
			});
		});
		
		describe('When the player has reached the level 2 and challenge 2.2', function() {
			
			beforeEach(function() {
				challenges = tryAll.allChallengesToTry(ericminio, database);				
			});
			
			it('has four challenges to try', function() {
				expect(challenges.length).toEqual(4);				
			});
			
			it('must try the first challenge', function() {
				expect(challenges[0]).toEqual(challenge11);
			});
			
			it('must try the second challenge', function() {
				expect(challenges[1]).toEqual(challenge12);
			});

			it('must try the third challenge', function() {
				expect(challenges[2]).toEqual(challenge21);
			});

			it('must try the fourth challenge', function() {
				expect(challenges[3]).toEqual(challenge22);
			});
		});

	});
	
	describe('Sort output', function() {
		
		it('does nothing when two challenges are in correct order', function() {		
			var output = [ { challenge: 'challenge 1.1' }, { challenge: 'challenge 1.2' } ];
			var sorted = tryAll.sortOutput(output, database);
			
			expect(sorted[0].challenge).toEqual('challenge 1.1');
		});
		
		it('invert two challenges in incorrect order', function() {
			var output = [ { challenge: 'challenge 1.2' }, { challenge: 'challenge 1.1' } ];
			var sorted = tryAll.sortOutput(output, database);
			
			expect(sorted[0].challenge).toEqual('challenge 1.1');
		});
		
		it('orders correctly three challenged', function() {
			var output = [ { challenge: 'challenge 2.2' }, { challenge: 'challenge 1.2' }, { challenge: 'challenge 1.1' } ];
			var sorted = tryAll.sortOutput(output, database);
			
			expect(sorted[0].challenge).toEqual('challenge 1.1');
			expect(sorted[1].challenge).toEqual('challenge 1.2');
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
	
		it('considering a player with 3 challenges in his portfolio', function(done) {
			database.find('ericminio', function(player) {
				expect(player.portfolio.length).toEqual(3);
				done();
			});
		});
		
		describe('When there is no regression,', function() {
			
			it('makes the next challenge to be in the portfolio of the player', function(done) {
				request("http://localhost:5000/try-all-up-to?login=ericminio", function(error, response, body) {
					database.find('ericminio', function(player) {
						expect(player.portfolio.length).toEqual(4);
						done();
					});
				});			
			});
		});
		
		describe('When there is a regression,', function() {
		
			beforeEach(function() {
				database.levels[0].challenges[0].checker = '../../test/support/response.always.404';
			});
			
			it('does not consider the next challenge as passing', function(done) {
				request("http://localhost:5000/try-all-up-to?login=ericminio", function(error, response, body) {
					database.find('ericminio', function(player) {
						expect(player.portfolio.length).toEqual(3);
						done();
					});
				});			
			});			
			
		});
		
	});
});

