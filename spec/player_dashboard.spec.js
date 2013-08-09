var Browser = require("zombie");
var Router = require('../public/js/router');
var Server = require('../public/js/server');
var InMemoryDatabase = require('../public/js/inMemoryDatabase');

describe("Player dashboard:", function() {

	var server = new Server(new Router());
	
	beforeEach(function() {
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	describe("When player does not exist", function() {

		it("simply notifies that this player is unknown", function(done) {
			var browser = new Browser();
			browser.visit("http://localhost:5000/players/ericminio").
				then(function() {
					expect(browser.text('#info')).toEqual("Unknown player");
				}).
				then(function() {
					expect(browser.query('#player').className).toContain("hidden");
					done();
				}).				
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});
	
	describe("When player is not alone in the database, ", function() {

		var repository = new InMemoryDatabase().withPlayers([
				{
					login: 'ericminio',
					avatar: 'http://ericminio-avatar'
				},
				{
					login: 'annessou',
					avatar: 'http://annessou-avatar'
				}
			]);

		beforeEach(function() {
			server.useRepository(repository);
		});
		
		it('btw uses a in-memory database', function() {
			expect(repository.find('annessou').login).toBe('annessou');
			expect(repository.find('not-here')).toBe(undefined);
		});

		it("finds it accurately", function(done) {
			var browser = new Browser();
			browser.visit("http://localhost:5000/players/annessou").
				then(function() {
					expect(browser.query('#player img').src).toEqual('http://annessou-avatar/');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});				
	});
	
	describe("When player exists, ", function() {

		beforeEach(function() {
			server.useRepository(
				{
					find: function() {
						return { avatar: 'http://this-avatar' };
					}
				}
			)
		});

		it("displays its avatar", function(done) {
			var browser = new Browser();
			browser.visit("http://localhost:5000/players/ericminio").
				then(function() {
					expect(browser.query('#player img').src).toEqual('http://this-avatar/');
				}).
				then(function() {
					expect(browser.query('#player').className).toContain('visible');
					done();
				}).				
				then(function() {
					expect(browser.query('#info').className).toContain('hidden');
					done();
				}).				
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
		
	});
	
});