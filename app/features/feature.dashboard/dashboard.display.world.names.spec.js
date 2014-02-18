var cheerio             = require('cheerio');
var Data                = require('../../support/database.with.levels');
var dashboard			= require('./lib/display.dashboard.js');
var response			= require('../../support/fake.response');
var array               = require('../../utils/lib/array.utils');

describe('The dashboard of a new player', function() {
	
	var database = new Data();
	var page;
	
	beforeEach(function() {	
		database.players = [ { login: 'ericminio', } ];
		dashboard({ url: '/players/ericminio' }, response, database);
		page = cheerio.load(response.html);		
	});

	it('sets name of worlds', function() {
        array.forEach(database.worlds, function(world, worldIndex) {
            expect(page('#world-' + (worldIndex+1) + ' .world-name').text()).toEqual(world.name);
        });
	});
});