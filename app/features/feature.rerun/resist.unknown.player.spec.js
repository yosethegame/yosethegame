var cheerio     = require('cheerio');
var Data        = require('../../support/database.with.levels');
var rerun		= require('./lib/display.rerun.request.js');
var response	= require('../../support/fake.response');

describe('Rerun: when the player is unknown,', function() {
	
	var page;
	
	beforeEach(function(done) {	
    	var database = new Data();
		database.players = [ {
			login: 'ericminio',
            avatar: '/img/me.png',
			portfolio: [ { server: 'this-server', achievements: [1] } ]
		}];		
		rerun({ url: '/players/unknown/rerun/world/1/level/1' }, response, database, function() {
    		page = cheerio.load(response.html);
		    done();
		});
	});
	
    it('makes the info section visible', function() {
		expect(page('#info').attr('class')).toContain('visible');
    });	

    it('hides the section player', function() {
		expect(page('#player').attr('class')).toContain('hidden');
    });	

	it('displays a related message', function() {
		expect(page('#info').text()).toEqual('this player is unknown');
	});	
});