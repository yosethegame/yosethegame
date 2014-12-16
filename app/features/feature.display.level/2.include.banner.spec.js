var cheerio     = require('cheerio');
var Data		= require('../../support/database.with.levels');
var display	    = require('./lib/display.level.request.js');
var response	= require('../../support/fake.response');
var fs			= require('fs');

describe('Level description', function() {
	
	var page;
	
	beforeEach(function() {	
    	var database = new Data();
		database.players = [ {
			login: 'ericminio',
            avatar: '/img/me.png',
			portfolio: [ { server: 'this-server', achievements: [1] } ]
		}];		
		database.worlds[0].levels[0].title = 'this is the title of the challenge';
		display({ url: '/players/ericminio/display/world/1/level/1' }, response, database);
		page = cheerio.load(response.html);
	});
	
	it('includes avatar of the player in the banner', function() {
		expect(page('#sidebar img#avatar').attr('src')).toEqual('/img/me.png');
	});
	
});