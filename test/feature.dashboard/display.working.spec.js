var cheerio 	= require('cheerio');
var Data	 	= require('../support/database.with.levels');
var dashboard	= require('../../public/feature.dashboard/display.dashboard.js');
var response	= require('../support/fake.response');

describe('The working icon', function() {
	
	var database = new Data();
	var page;
	var world;
	var level;
	
	it('appears in the last line', function() {
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[1].isOpenFor = function(player) { return true; }
		database.players = [ {
			login: 'ericminio', 			
			portfolio: [ { server: 'this-server', achievements: [1, 2, 3, 4, 5] } ]
		} ];
		dashboard({ url: '/players/ericminio' }, response, database);
		page = cheerio.load(response.html);
		var worldCount = database.worlds.length;

		expect(page('table#worlds tr:nth-child('+ (worldCount+1) + ').working').length).toEqual(1);
	});
	
	
});