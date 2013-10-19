var cheerio 	= require('cheerio');
var Data	 	= require('../support/database.with.levels');
var dashboard	= require('../../public/feature.dashboard/display.dashboard.js');
var response	= require('../support/fake.response');

describe('The working icon', function() {
	
	var database = new Data();
	var page;
	var world;
	var level;
	
	beforeEach(function() {
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[1].isOpenFor = function(player) { return false; }
	});

	it('appears when the player has completed all the worlds', function() {
		database.players = [ {
			login: 'ericminio', 			
			portfolio: [ { server: 'this-server', achievements: [1, 2, 3, 4, 5] } ]
		} ];
		dashboard({ url: '/players/ericminio' }, response, database);
		page = cheerio.load(response.html);

		expect(page('table#worlds tr.working').length).toEqual(1);
	});
	
	it('is hidden when the player has not completed all the worlds', function() {
		database.players = [ {
			login: 'ericminio', 			
			portfolio: [ { server: 'this-server', achievements: [1, 2, 3, 4] } ]
		} ];
		dashboard({ url: '/players/ericminio' }, response, database);
		page = cheerio.load(response.html);

		expect(page('table#worlds tr.working').length).toEqual(0);
	});
	
	
});