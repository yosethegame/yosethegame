var cheerio 	= require('cheerio');
var Data	 	= require('../support/database.with.levels');
var dashboard	= require('../../public/feature.dashboard/display.dashboard.js');
var response	= require('../support/fake.response');

describe('The working icon', function() {
	
	var database = new Data();
	var page;
	var world;
	var level;
	
	it('appears when all worlds are open', function() {
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[1].isOpenFor = function(player) { return true; }
		database.players = [ {
			login: 'ericminio', 			
			portfolio: [ { server: 'this-server', achievements: [1, 2, 3, 4, 5] } ]
		} ];
		dashboard({ url: '/players/ericminio' }, response, database);
		page = cheerio.load(response.html);

		expect(page('table#worlds tr.working').length).toEqual(1);
	});
	
	it('is hidden when one world is hidden', function() {
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[1].isOpenFor = function(player) { return false; }
		database.players = [ {
			login: 'ericminio', 			
			portfolio: [ { server: 'this-server', achievements: [] } ]
		} ];
		dashboard({ url: '/players/ericminio' }, response, database);
		page = cheerio.load(response.html);

		expect(page('table#worlds tr.working').length).toEqual(0);
	});
	
	it('appears when all worlds are open, even if the player has not completed all the worlds', function() {
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[1].isOpenFor = function(player) { return true; }
		database.players = [ {
			login: 'ericminio', 			
			portfolio: [ { server: 'this-server', achievements: [1, 2, 3] } ]
		} ];
		dashboard({ url: '/players/ericminio' }, response, database);
		page = cheerio.load(response.html);

		expect(page('table#worlds tr.working').length).toEqual(1);
	});
	
});