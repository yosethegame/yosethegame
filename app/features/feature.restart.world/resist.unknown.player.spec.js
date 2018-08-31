var cheerio         = require('cheerio');
var Database        = require('../../support/database.with.levels');
var restartworld    = require('./lib/restart.world.request');
var response        = require('../../support/fake.response');

describe('Restart world: when the player is unknown,', function() {
   
    var response = {
        end: function() {},
        writeHead: function(code, headers) { 
            this.code = code; 
            this.headers = headers; 
        }
    };

    beforeEach(function() {		
	    var database = new Database();
        database.players = [{
           login: 'zoupo',
           score: 10,
           portfolio: [ { server: 'any', achievements: [database.worlds[0].levels[0].id] } ]
		}];
		restartworld({ url: '/players/unknown/restart/world/2' }, response, database);
    });

    it('sets http code to redirect', function() {
        expect(response.code).toEqual(302);
    });
    
    it('redirects to dashboard of player', function() {
        expect(response.headers.location).toEqual('/players/unknown');
    });
});