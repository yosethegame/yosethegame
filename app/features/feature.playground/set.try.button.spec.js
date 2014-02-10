var cheerio 	= require('cheerio');
var Data		= require('../../support/database.with.levels');
var playground	= require('./lib/display.playground.request.js');
var response	= require('../../support/fake.response');
var fs			= require('fs');

describe('Try button', function() {
	
	var database = new Data();
	var page;
	var player;
	
	beforeEach(function() {	
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[1].isOpenFor = function(player) { return true; }
		database.worlds[1].levels[0].isOpenLevelFor = function(player) { return true; }
		player = {
			login: 'ericminio',
			portfolio: [ { server: 'this-server', achievements: [1, 2] } ]
		}
		database.players = [ player ];
	});
	
	it('targets the given level in the given world', function() {
		playground({ url: '/players/ericminio/play/world/2/level/1' }, response, database);
		page = cheerio.load(response.html);

		expect(page('#try').attr('onclick')).toEqual('new TryListener().try(2, 1)');
	});
	
});