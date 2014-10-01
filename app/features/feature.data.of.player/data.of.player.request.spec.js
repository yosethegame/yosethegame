var DatabaseWithChallenges = require('../../support/database.with.levels');
var data = require('./lib/data.of.player.request');

describe('Data of player request', function() {

    var response = {
        setHeader: function(key, value) { this.headerKey = key; this.headerValue = value; },
    	writeHead: function(statusCode) { this.statusCode = statusCode; },
        write: function(content) { this.content = content; },
    	end: function() {}
    };
    var database;
    
    beforeEach(function() {
        database = new DatabaseWithChallenges();
        database.players = [{ login: 'bilou', score: 168421, avatar: 'brenda.png' }];
    });
    
    describe('when the player is unknown', function() {
        
        beforeEach(function() {
            data({url: '/players/unknown/data'}, response, database);
        });
        
        it('returns 404', function() {
            expect(response.statusCode).toEqual(404);
        });
    
        it('sets content-type to application/json', function() {
            expect(response.headerKey).toEqual('Content-Type');
            expect(response.headerValue).toEqual('application/json');
        });
    });
    
    describe('when the player is known', function() {
        
        beforeEach(function() {
            data({url: '/players/bilou/data'}, response, database);        
        });
        
        it('returns 200', function() {
            expect(response.statusCode).toEqual(200);
        });

        it('sets content-type to application/json', function() {
            expect(response.headerKey).toEqual('Content-Type');
            expect(response.headerValue).toEqual('application/json');
        });

        it('returns the login', function() {
            expect(JSON.parse(response.content).login).toEqual('bilou');
        });

        it('returns the score', function() {
            expect(JSON.parse(response.content).score).toEqual(168421);
        });

        it('returns the avatar', function() {
            expect(JSON.parse(response.content).avatar).toEqual('brenda.png');
        });
    });    
});