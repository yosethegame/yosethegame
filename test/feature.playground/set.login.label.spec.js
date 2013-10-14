var cheerio 	= require('cheerio');
var Data		= require('../support/database.with.levels');
var playground	= require('../../public/feature.playground/display.playground.request.js');
var response	= require('../support/fake.response');
var fs			= require('fs');

describe('Login hidden label', function() {
	
	var database = new Data();
	var page;
	var player;
	
	beforeEach(function() {	
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[1].isOpenFor = function(player) { return true; }
		player = {
			login: 'ericminio',
			portfolio: [1, 2, 3, 4]
		}
		database.players = [ player ];
	});
	
	it('is set with login of the player', function() {
		playground({ url: '/players/ericminio/play/world/2' }, response, database);
		page = cheerio.load(response.html);

		expect(page('#login').text()).toEqual('ericminio');
	});
	
});