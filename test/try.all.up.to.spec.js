var request = require('request');
var Server = require('../public/js/server');
var tryAll = require('../public/js/try-all-up-to');
var InMemoryDatabase = require('./support/inMemoryDatabase');
var $ = require('jquery');

describe("Trying to pass challenges", function() {

	var server;
	var database;

	beforeEach(function() {
		database = new InMemoryDatabase();
		database.players = [
			{
				login: 'annessou'
			},
			{
				login: 'bilou',
				server: 'guiguilove',
				portfolio: [
					{
						title: 'thisTitle'
					}
				]
			},
			{
				login: 'clairette',
				server: 'http://localhost:6000',
				portfolio: [
					{
						title: 'thisTitle'
					}
				]
			}
		];
		database.challenges = [
			{
				title: 'thisTitle',
				file: 'thisFile',
				checker: '../../test/support/response.always.valid',
				requester: '../../test/support/empty.request',
			},
			{
				title: 'secondTitle',
				file: 'secondFile',
				checker: '../../test/support/response.always.valid',
				requester: '../../test/support/empty.request',
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
			database.challenges[0].checker = '../../test/support/response.always.404'
		});

		it("returns normally", function(done) {
			request("http://localhost:5000/try-all-up-to?server=http://localhost:6000", function(error, response, body) {
				expect(response.statusCode).toEqual(200);
				done();
			});
		});
		it('returns detailed error for 404', function(done) {
			request("http://localhost:5000/try-all-up-to?server=http://localhost:6000", function(error, response, body) {
				expect(body).toEqual(JSON.stringify([
						{
							challenge: 'thisTitle',
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
			request("http://localhost:5000/try-all-up-to", function(error, response, body) {
				expect(body).toEqual(JSON.stringify([
						{
							challenge: 'thisTitle',
							code: 404,
							expected: 'a correct expected value',
							got: 'undefined'
						}
					]					
				));
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
				var player = database.find('annessou');
				expect(player.server).toEqual('http://localhost:6000');
				done();
			});			
		});
		it('makes the challenge to be in the portfolio of the player', function(done) {
			database.challenges[0].title = 'Get ready for fun :)';
			request("http://localhost:5000/try-all-up-to?login=annessou&server=http://localhost:6000", function(error, response, body) {
				var player = database.find('annessou');
				expect(player.portfolio[0].title).toEqual('Get ready for fun :)')
				done();
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
				expect(body).toEqual(JSON.stringify([
						{
							challenge: 'thisTitle',
							code: 200,
							expected: 'a correct expected value',
							got: 'a correct actual value'
						}
					]					
				));
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
				var player = database.find('bilou');
				expect(player.server).toEqual('guiguilove');
				done();
			});			
		});
	});		
	
	describe("Player's server use", function() {
		var remote;
		beforeEach(function() {
			remote = require('http').createServer(
				function (request, response) {
					response.end();
				})
			.listen(6000);
			var player = database.find('bilou');
			player.server = 'http://localhost:6000';
		});
		afterEach(function() {
			remote.close();
		});
	
		it('uses the already known server of the player even if provided', function(done) {
			request("http://localhost:5000/try-all-up-to?login=bilou&server=any", function(error, response, body) {
				var result = $.parseJSON(body);
				expect(result[0].code).toEqual(200);
				done();
			});			
		});
		
		it('supports when no server is provided', function(done) {
			request("http://localhost:5000/try-all-up-to?login=bilou", function(error, response, body) {
				var result = $.parseJSON(body);
				expect(result[0].code).toEqual(200);
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
				expect(body).toEqual(JSON.stringify([
						{
							challenge: 'thisTitle',
							code: 200,
							expected: 'a correct expected value',
							got: 'a correct actual value'
						},
						{
							challenge: 'secondTitle',
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
				var player = database.find('clairette');
				expect(player.portfolio.length).toEqual(2);
				expect(player.portfolio[1].title).toEqual('secondTitle');
				done();
			});			
		});
	});
});

