var DatabaseWithChallenges = require('../../support/database.with.levels');
var cheerio = require('cheerio');
var page = require('./lib/community.request');

describe('Community page > player count', function() {

    var database = new DatabaseWithChallenges();
    var response = { write: function(html) { this.html = html; }, end: function() {} };

    beforeEach(function() {
        page.hallOfFame = require('./lib/hall.of.fame');
    });
    
    it('displays the player count', function() {
        database.players = [ { login: 'me' }, { login: 'you' } ];
		page({}, response, database);		
		var body = cheerio.load(response.html);
		
		expect(body('#player-count').html()).toEqual('&nbsp;2');
    });
});
