var Browser = require("zombie");
var router = require('../public/js/router');
var Server = require('../public/js/server');
var InMemoryDatabase = require('../test/support/database.with.levels');

describe('Login feedback message', function() {

	var server = new Server(router);
	
	beforeEach(function() {
		database = new InMemoryDatabase();
		database.players = [];
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	it('is confirmed correct by a message', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:5000/create-new-player').
			then(function () {
				return browser.fill('#login', 'eric');
			}).
			then(function() {
				expect(browser.query('#login-feedback').className).toContain('alert-success');
			}).
			then(function() {
				expect(browser.text('#login-feedback label')).toContain('Login correct');
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});

	it('is confirmed incorrect by a message when incorrect', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:5000/create-new-player').
			then(function () {
				return browser.fill('#login', 'eric')
							  .fill('#login', '');
			}).
			then(function() {
				expect(browser.query('#login-feedback').className).toContain('alert-danger');
			}).
			then(function() {
				expect(browser.text('#login-feedback label')).toContain('Login incorrect');
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});
});