var Data = require('../../support/database.with.levels');
var response = require('../../support/fake.response');
var display = require('./lib/display.level.request.js');
var cheerio = require('cheerio');

describe('Level description: when the level is unknown', function() {
	
	var page;
	
	beforeEach(function() {	
    	var database = new Data();
		database.players = [ {
			login: 'ericminio',
            avatar: '/img/me.png',
			portfolio: [ { server: 'this-server', achievements: [1] } ]
		}];		
        var levelCount = database.worlds[0].levels.length;
		display({ url: '/players/ericminio/display/world/1/level/' + (levelCount+1) }, response, database);
		page = cheerio.load(response.html);
	});
	
    it('makes the info section visible', function() {
		expect(page('#info').attr('class')).toContain('visible');
    });	

    it('hides the section player', function() {
		expect(page('#player').attr('class')).toContain('hidden');
    });	

	it('displays a related message', function() {
		expect(page('#info').text()).toEqual('this level is unknown');
	});	
});