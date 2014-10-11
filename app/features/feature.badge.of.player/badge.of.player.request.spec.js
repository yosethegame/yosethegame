var DatabaseWithChallenges = require('../../support/database.with.levels');
var badge = require('./lib/badge.of.player.request');

describe('Badge of player request', function() {

    var response = {
        setHeader: function(key, value) { this.headerKey = key; this.headerValue = value; },
    	writeHead: function(statusCode) { this.statusCode = statusCode; },
        write: function(content) { this.content = content; },
    	end: function() {},
        reset: function() { 
            this.headerKey = undefined; 
            this.headerValue = undefined; 
            this.statusCode = undefined;
            this.content = undefined;
        }
    };
    var database;
    
    beforeEach(function() {
        database = new DatabaseWithChallenges();
        database.players = [{ login: 'bilou', score: 168421, avatar: 'brenda.png' }];
        response.reset();
    });
    
    describe('when the player is known', function() {
        
        beforeEach(function(done) {
            badge({url: '/players/bilou/badge.svg'}, response, database, function() {
                done();
            });        
        });
        
        it('returns 200', function() {
            expect(response.statusCode).toEqual(200);
        });

        it('sets content-type to svg', function() {
            expect(response.headerKey).toEqual('Content-Type');
            expect(response.headerValue).toEqual('image/svg+xml');
        });
        
        it('returns a badge containing the score', function() {
            expect(response.content).toContain('168421');
        });
    });    
    
    describe('when the player is unknown', function() {
        
        beforeEach(function(done) {
            badge({url: '/players/unknown/badge.svg'}, response, database, function() {
                done();
            });
        });
        
        it('returns 404', function() {
            expect(response.statusCode).toEqual(404);
        });
        
        it('returns empty body', function() {
            expect(response.content).toEqual(undefined);
        });
    });
});