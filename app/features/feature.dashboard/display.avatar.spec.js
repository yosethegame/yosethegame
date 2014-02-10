var cheerio 	= require('cheerio');
var Data		= require('../../support/database.with.levels');
var dashboard	= require('./lib/display.dashboard.js');
var response	= require('../../support/fake.response');

describe('The avatar', function() {
	
	var database = new Data();
	var page;
	var player;
	
	beforeEach(function() {	
		player = {
			login: 'ericminio', 			
			avatar: 'this-avatar'
		}
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[1].isOpenFor = function(player) { return true; }
		database.players = [ player ];
	});
	
	it('is displayed', function() {
		dashboard({ url: '/players/ericminio' }, response, database);
		page = cheerio.load(response.html);

		expect(page('#avatar').attr('src')).toEqual('this-avatar');
	});
	
	
});