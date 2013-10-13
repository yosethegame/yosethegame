var cheerio 	= require('cheerio');
var Data		= require('../support/database.with.levels');
var playground	= require('../../public/feature.playground/display.playground.request.js');
var response	= require('../support/fake.response');

describe('The banner', function() {
	
	var database = new Data();
	var page;
	var player;
	
	beforeEach(function() {	
		player = {
			login: 'ericminio', 			
			avatar: 'this-avatar',
			score: 42
		}
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[1].isOpenFor = function(player) { return true; }
		database.players = [ player ];
		playground({ url: '/players/ericminio/play/world/1' }, response, database);
		page = cheerio.load(response.html);

	});
	
	it('displays the avatar', function() {
		expect(page('#avatar').attr('src')).toEqual('this-avatar');
	});
	
	it('displays the score', function() {
		expect(page('#score').text()).toEqual('000120');
	});
	
	
});