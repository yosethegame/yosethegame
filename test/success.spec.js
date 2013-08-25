var request = require('request');
var Server = require('../public/js/server');
var Router = require('../public/js/router');
var success = require('../public/js/success.js');
var InMemoryDatabase = require('./inMemoryDatabase');

describe('Success listener', function() {
	
	var server;
	var database;
	
	beforeEach(function() {
		database = new InMemoryDatabase();
		database.challenges = [
			{
				title: 'a tough challenge',
				file: 'path/to/challenge/file'
			}
		];
		database.players = [
			{ login: 'ericminio' },
			{ 
				login: 'annessou', 
				portfolio: [
					{ title: 'First challenge' }
				]
			}
		];
		server = require('http').createServer(function(request, response) {
			success(request, response, database);
		}).listen(5000, 'localhost');					
	});
	
	afterEach(function() {
		server.close();
	});
	
	it('does not allow a GET request', function(done) {
		request("http://localhost:5000/success", function(error, response, body) {
			expect(response.statusCode).toEqual(405);
			done();
		});
	});
	
	it('saves the success of a new player', function(done) {
		request.post(
			{
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url: 'http://localhost:5000/success',
				form: {
					login: 'ericminio',
					challenge: 'path/to/challenge/file',
					server: 'the/server/of/ricou'
				}
			}, 
			function(error, response, body) {
				var player = database.find('ericminio');
				expect(player.portfolio[0].title).toEqual('a tough challenge');
				expect(player.portfolio[0].server).toEqual('the/server/of/ricou');
				done();
			});
	});	
	
	it('saves the success of any player', function(done) {
		request.post(
			{
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url: 'http://localhost:5000/success',
				form: {
					login: 'annessou',
					challenge: 'path/to/challenge/file',
					server: 'the/server/of/annessou'
				}
			}, 
			function(error, response, body) {
				var player = database.find('annessou');
				expect(player.portfolio.length).toEqual(2);
				expect(player.portfolio[1].title).toEqual('a tough challenge');
				expect(player.portfolio[1].server).toEqual('the/server/of/annessou');
				done();
			});
	});
	
	it('declares the request to be a bad request when the form misses the login', function(done) {
		request.post(
			{
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url: 'http://localhost:5000/success',
				form: {
					challenge: 'path/to/challenge/file',
					server: 'the/server/of/annessou'
				}
			}, 
			function(error, response, body) {
				expect(response.statusCode).toEqual(400);
				done();
			});
	});
	
	it('declares the request to be a bad request when the form misses the challenge file', function(done) {
		request.post(
			{
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url: 'http://localhost:5000/success',
				form: {
					login: 'annessou',
					server: 'the/server/of/annessou'
				}
			}, 
			function(error, response, body) {
				expect(response.statusCode).toEqual(400);
				done();
			});
	});

	it('declares the request to be a bad request when the form misses the server used by the player', function(done) {
		request.post(
			{
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url: 'http://localhost:5000/success',
				form: {
					login: 'annessou',
					challenge: 'path/to/challenge/file'
				}
			}, 
			function(error, response, body) {
				expect(response.statusCode).toEqual(400);
				done();
			});
	});

	it('declares the request to be a bad request when the form is missing', function(done) {
		request.post(
			{
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url: 'http://localhost:5000/success'
			}, 
			function(error, response, body) {
				expect(response.statusCode).toEqual(400);
				done();
			});
	});
});