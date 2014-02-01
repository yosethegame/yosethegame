var cheerio 	= require('cheerio');
var Data		= require('../support/database.with.levels');
var playground	= require('../../public/feature.playground/display.playground.request.js');
var response	= require('../support/fake.response');
var fs			= require('fs');

describe('Server input field', function() {
	
	var database = new Data();
	var page;
	var player;
	
	it('is displayed when the player has no server', function() {
		database.players = [ {login: 'ericminio'} ];
		var content = '<html><body>anything before<div id="challenge-content">content<label>with html</label></div>anything after</body></html>';
		fs.writeFileSync('test/data/level-content', content);
		database.worlds[0].levels[0].file = 'test/data/level-content';
		playground({ url: '/players/ericminio/play/world/1/level/1' }, response, database);
		page = cheerio.load(response.html);

	    expect(page("#server-input-section").attr('class')).toContain('visible');
	});

	it('is hidden when the player has a server', function() {
		database.worlds[0].levels[1].isOpenLevelFor = function(player) { return true; }
		player = {
			login: 'ericminio',
			portfolio: [ { server: 'this-server', achievements: [1] } ]
		}
		database.players = [ player ];
		var content = '<html><body>anything before<div id="challenge-content">content<label>with html</label></div>anything after</body></html>';
		fs.writeFileSync('test/data/level-content', content);
		database.worlds[0].levels[0].file = 'test/data/level-content';
		playground({ url: '/players/ericminio/play/world/1/level/2' }, response, database);
		page = cheerio.load(response.html);

	    expect(page("#server-input-section").attr('class')).toContain('hidden');
	});

	
});