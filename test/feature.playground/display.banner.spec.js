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
		};
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
		expect(page('#score').text()).toEqual('000042');
	});
	
	describe('Greetings', function() {
		
		it('contains the title of the level', function() {
			expect(page('#greetings').text()).toContain('level 1.1 : the first challenge');
		});
		
		it('adapts to the portfolio of the player', function() {
			player.portfolio = [ 1, 2, 3 ];
			playground({ url: '/players/ericminio/play/world/2' }, response, database);
			page = cheerio.load(response.html);

			expect(page('#greetings').text()).toContain('level 2.2 : the fourth challenge');
		});
		
	});
	
	it('updates the link to the dashboard of the player', function() {
		expect(page('#dashboard-link').attr('href')).toEqual('/players/ericminio');
	});
});