var cheerio 	= require('cheerio');
var Data		= require('../support/database.with.levels');
var playground	= require('../../public/feature.playground/display.playground.request.js');
var response	= require('../support/fake.response');
var fs			= require('fs');

describe('Level invitation', function() {
	
	var database = new Data();
	var page;
	var player;
	
	beforeEach(function() {	
		database.worlds[1].isOpenFor = function(player) { return true; }
		database.worlds[1].levels[2].isOpenLevelFor = function(player) { return true; }
		player = {
			login: 'ericminio',
			portfolio: [ { server: 'this-server', achievements: [1, 2, 3, 4] } ]
		}
		database.players = [ player ];
	});
	
	it('displays the title of the challenge', function() {
		database.worlds[1].levels[2].title = 'this is the next challenge';
		playground({ url: '/players/ericminio/play/world/2/level/3' }, response, database);
		page = cheerio.load(response.html);

		expect(page('#next-challenge-title').text()).toEqual('this is the next challenge');
	});
	
	it('displays the content of the challenge', function() {
		var content = '<html><body>anything before<div id="challenge-content">content<label>with html</label></div>anything after</body></html>';
		fs.writeFileSync('test/data/level-content', content);
		database.worlds[1].levels[2].file = 'test/data/level-content';
		playground({ url: '/players/ericminio/play/world/2/level/3' }, response, database);
		page = cheerio.load(response.html);

		expect(page('#next-challenge-content').html()).toEqual('content<label>with html</label>');
	});

	
});