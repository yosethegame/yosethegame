var request = require('request');
var Server = require('../public/js/server');
var tryAll = require('../public/js/try-all-up-to');
var InMemoryDatabase = require('./inMemoryDatabase');

describe("Trying to pass challenges", function() {

	var server;
	var database;

	beforeEach(function() {
		database = new InMemoryDatabase();
		database.players = [
			{
				login: 'annessou'
			}
		];
		database.challenges = [
			{
				title: 'thisTitle',
				file: 'thisFile',
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
			request("http://localhost:5000/try-all-up-to?challenge=thisFile&server=http://localhost:6000", function(error, response, body) {
				expect(response.statusCode).toEqual(200);
				done();
			});
		});
		it('returns detailed error for 404', function(done) {
			request("http://localhost:5000/try-all-up-to?challenge=thisFile&server=http://localhost:6000", function(error, response, body) {
				expect(body).toEqual(JSON.stringify([
						{
							challenge: 'thisTitle',
							code: 404,
							expected: 'a correct value',
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
			request("http://localhost:5000/try-all-up-to?login=annessou&challenge=thisFile&server=http://localhost:6000", function(error, response, body) {
				var player = database.find('annessou');
				expect(player.server).toEqual('http://localhost:6000');
				done();
			});			
		});
		it('makes the challenge to be in the portfolio of the player', function(done) {
			database.challenges[0].title = 'Get ready for fun :)';
			request("http://localhost:5000/try-all-up-to?login=annessou&challenge=thisFile&server=http://localhost:6000", function(error, response, body) {
				var player = database.find('annessou');
				expect(player.portfolio[0].title).toEqual('Get ready for fun :)')
				done();
			});			
		});
		it('returns ok status', function(done) {
			request("http://localhost:5000/try-all-up-to?login=annessou&challenge=thisFile&server=http://localhost:6000", function(error, response, body) {
				expect(response.statusCode).toEqual(200);
				done();
			});			
		});
		it('returns detailed content for success', function(done) {
			request("http://localhost:5000/try-all-up-to?login=annessou&challenge=thisFile&server=http://localhost:6000", function(error, response, body) {
				expect(body).toEqual(JSON.stringify([
						{
							challenge: 'thisTitle',
							code: 200,
							expected: 'a correct value',
							got: 'a correct value'
						}
					]					
				));
				done();
			});			
		});
	});
		
});
