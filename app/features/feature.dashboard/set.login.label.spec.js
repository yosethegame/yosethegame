var cheerio     = require('cheerio');
var Data		= require('../../support/database.with.levels');
var dashboard	= require('./lib/display.dashboard.js');
var response	= require('../../support/fake.response');
var fs			= require('fs');

describe('Login hidden label', function() {
	
	var database = new Data();
	var page;
	var player;
	
	beforeEach(function() {	
		database.worlds[0].isOpenFor = function(player) { return true; };
		database.worlds[1].isOpenFor = function(player) { return true; };
		player = {
			login: 'ericminio'
		};
		database.players = [ player ];
	});
	
	it('is set with login of the player', function() {
		dashboard({ url: '/players/ericminio' }, response, database);
		page = cheerio.load(response.html);

		expect(page('#login').text()).toEqual('ericminio');
	});
	
});