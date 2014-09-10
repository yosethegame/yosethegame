var DatabaseWithChallenges = require('../../support/database.with.levels');
var data = require('./lib/data.of.player.request');

describe('Data of player request', function() {

    var database = new DatabaseWithChallenges();
    
    it('returns 404 when the player is unknown', function() {
        var response = {
            setHeader: function(key, value) {},
        	writeHead: function(statusCode) { this.statusCode = statusCode; },
        	end: function() {}
        };
        data({url: '/players/unknown/data'}, response, database);
        
        expect(response.statusCode).toEqual(404);
    });
});