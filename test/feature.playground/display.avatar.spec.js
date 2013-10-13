var cheerio 	= require('cheerio');
var Data		= require('../support/database.with.levels');
var playground	= require('../../public/feature.playground/display.playground.request.js');
var response	= require('../support/fake.response');

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
		playground({ url: '/players/ericminio/play/world/1' }, response, database);
		page = cheerio.load(response.html);

		expect(page('#avatar').attr('src')).toEqual('this-avatar');
	});
	
	
});