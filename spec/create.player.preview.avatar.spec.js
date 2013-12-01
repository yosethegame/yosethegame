var Browser = require("zombie");
var router = require('../public/js/router');
var Server = require('../public/js/server');
var InMemoryDatabase = require('../test/support/database.with.levels');

describe('Avatar preview', function() {

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
	
	it('is updated with the chosen url', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:5000/create-new-player').
			then(function () {
				return browser.fill('#login', 'eric')
							  .fill('#avatar', 'http://this-url');
			}).
			then(function() {
				expect(browser.query('#avatar-preview').src).toEqual('http://this-url/');
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});
	
	it('is confirmed correct by a message', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:5000/create-new-player').
			then(function () {
				return browser.fill('#login', 'eric')
							  .fill('#avatar', '/img/default-avatar.png');
			}).
			then(function() {
				expect(browser.query('#preview-feedback').className).toContain('alert-success');
			}).
			then(function() {
				expect(browser.text('#preview-feedback label')).toContain('Image found');
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
							  .fill('#avatar', 'http://this-url');
			}).
			then(function() {
				expect(browser.query('#preview-feedback').className).toContain('alert-danger');
			}).
			then(function() {
				expect(browser.text('#preview-feedback label')).toContain('Not an image');
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});
});