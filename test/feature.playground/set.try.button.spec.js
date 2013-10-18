var cheerio 	= require('cheerio');
var Data		= require('../support/database.with.levels');
var playground	= require('../../public/feature.playground/display.playground.request.js');
var response	= require('../support/fake.response');
var fs			= require('fs');

describe('Try button', function() {
	
	var database = new Data();
	var page;
	var player;
	
	beforeEach(function() {	
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[1].isOpenFor = function(player) { return true; }
		player = {
			login: 'ericminio',
			portfolio: [ { server: 'this-server', achievements: [1, 2, 3, 4] } ]
		}
		database.players = [ player ];
	});
	
	it('displays the title of the challenge', function() {
		playground({ url: '/players/ericminio/play/world/2' }, response, database);
		page = cheerio.load(response.html);

		expect(page('#try').attr('onclick')).toEqual('new TryListener().try(2)');
	});
	
});