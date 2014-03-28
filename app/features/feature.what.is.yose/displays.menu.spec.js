var DatabaseWithChallenges = require('../../support/database.with.levels');
var cheerio = require('cheerio');

describe("what-is-yose page > menu", function() {

	var page;
	var database = new DatabaseWithChallenges();

	beforeEach(function() {	
        var endpoint = require('./lib/what.is.yose.request');
        var response = { write: function(html) { this.html = html; }, end: function() {} };
        endpoint({}, response, database);
		page = cheerio.load(response.html);
	});
			
    it('contains a link to create a new player', function() {
        expect(page('a#create-new-player-link').attr('href')).toEqual('/create-new-player');
    });

    it('contains a link to access the community page', function() {
        expect(page('a#community-link').attr('href')).toEqual('/community');
    });

    it('contains a form to access your dashboard', function() {
        expect(page('input#login').length).toEqual(1);
    });    
});