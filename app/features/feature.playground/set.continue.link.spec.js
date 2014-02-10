var cheerio 	= require('cheerio');
var Data		= require('../../support/database.with.levels');
var playground	= require('./lib/display.playground.request.js');
var response	= require('../../support/fake.response');
var fs			= require('fs');

describe('Continue link', function() {
	
	var database = new Data();
	var page;
	var player;
	
	beforeEach(function() {	
		database.players = [ {login: 'ericminio'} ];
	});
	
	it('targets dashboard of the player', function() {
		playground({ url: '/players/ericminio/play/world/1/level/1' }, response, database);
		page = cheerio.load(response.html);

		expect(page('#continue-link').attr('href')).toEqual('/players/ericminio');
	});
	
});