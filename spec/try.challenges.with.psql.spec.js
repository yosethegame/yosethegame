var request = require('request');
var Server = require('../public/js/server');
var tryAll = require('../public/js/try-all-up-to');
var PSql = require('../public/js/psql.database');
var $ = require('jquery');

describe("Trying to pass challenges >", function() {

	var server;
	var database;
	var ericminio;

	var challenge11;
	var challenge12;
	var challenge21;
	var challenge22;

	beforeEach(function(done) {
		ericminio = {
			login: 'ericminio',
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
		
		database = new PSql(process.env.DATABASE_URL);
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
		database.createPlayer(ericminio, function() {				
			server = require('http').createServer(function(incoming, response) {
				tryAll(incoming, response, database);
			}).listen(5000);
			done();
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

