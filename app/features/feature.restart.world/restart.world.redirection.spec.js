var response        = require('../../support/fake.response');
var Database        = require('../../support/database.with.levels');
var restartworld    = require('./lib/restart.world.request');

describe('Restart world link', function() {
    
    var response = {
        end: function() {},
        writeHead: function(code, headers) { 
            this.code = code; 
            this.headers = headers; 
        }
    };

    beforeEach(function() {		
        database = new Database();
        database.players = [{
           login: 'bilou',
           score: 10,
           portfolio: [ { server: 'any', achievements: [database.worlds[0].levels[0].id] } ]
		}];
		restartworld({ url: '/players/bilou/restart/world/1' }, response, database);
    });

    it('sets http code to redirect', function() {
        expect(response.code).toEqual(302);
    });
    
    it('redirects to dashboard of player', function() {
        expect(response.headers.location).toEqual('/players/bilou');
    });
    
});