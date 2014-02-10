var post 			 = require('./lib/post.new.player.request');
var InMemoryDatabase = require('../../support/database.with.levels');

describe('Post player endpoint', function() {

	var database;
	var server;
	
	beforeEach(function() {
		database = new InMemoryDatabase();
		server = require('http').createServer(function(request, response){
			post(request, response, database);
		}).listen(5000, 'localhost');
	});
		
	afterEach(function() {
		server.close();
	});
		
	it('creates the given player in database', function(done) {
		require('request').post('http://localhost:5000', {form: { login:'eric', avatar:'this-avatar' } }, function(error, response, body) {
			database.find('eric', function(player) {
				expect(player).toBeDefined();
				done();
			});
		});
	});
	
	it('inserts the given player in database', function(done) {
		require('request').post('http://localhost:5000', {form: { login:'eric', avatar:'this-avatar' } }, function(error, response, body) {
			database.find('eric', function(player) {
				expect(player.avatar).toEqual('this-avatar');
				done();
			});
		});
	});

	it('initializes the score of the given player', function(done) {
		require('request').post('http://localhost:5000', {form: { login:'eric', avatar:'this-avatar' } }, function(error, response, body) {
			database.find('eric', function(player) {
				expect(player.score).toEqual(0);
				done();
			});
		});
	});
	
	it('returns 201', function(done) {
		require('request').post('http://localhost:5000', {form: { login:'eric', avatar:'this-avatar' } }, function(error, response, body) {
			expect(response.statusCode).toEqual(201);
			done();
		});
	});
});
