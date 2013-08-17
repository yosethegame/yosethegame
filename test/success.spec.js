var request = require('request');
var Server = require('../public/js/server');
var Router = require('../public/js/router');
var success = require('../public/js/success.js');

describe('Success listener', function() {
	
	var server;
	var spy = { 
		login: '',
		find: function(login) {
			this.login = login;
			this.player = {
				portfolio: []
			};
			return this.player;
		},
		savePlayer: function(player) {
			this.savedPlayer = player;
		},
		challenges: [
			{
				title: 'a tough challenge',
				file: 'path/to/challenge/file'
			}
		]
	};
	
	beforeEach(function() {
		server = require('http').createServer(function(request, response) {
			success(request, response, spy);
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
	
	it('accepts a POST', function(done) {
		request.post(
			{
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url: 'http://localhost:5000/success'
			}, 
			function(error, response, body) {
				expect(response.statusCode).toEqual(200);
				done();
			});
	});
	
	it('Saves the success of a new player', function(done) {
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
				expect(spy.login).toEqual('annessou');
				expect(spy.player.portfolio[0].title).toEqual('a tough challenge');
				expect(spy.player.portfolio[0].server).toEqual('the/server/of/annessou');
				expect(spy.savedPlayer).toEqual(spy.player);
				done();
			});
	});		

});