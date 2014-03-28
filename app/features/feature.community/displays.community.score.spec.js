var DatabaseWithChallenges = require('../../support/database.with.levels');
var cheerio = require('cheerio');
var page = require('./lib/community.request');

describe('Community page > Community score', function() {

    var database = new DatabaseWithChallenges();
    var response = { write: function(html) { this.html = html; }, end: function() {} };
    
    it('displays the community score', function() {
        database.players = [ { login: 'me', score: 100 }, { login: 'you', score: 200 } ];
		page({}, response, database);		
		var body = cheerio.load(response.html);
		
		expect(body('#score-community').html()).toEqual('000300');
    });
});
