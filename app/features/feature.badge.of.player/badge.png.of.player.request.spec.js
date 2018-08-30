var DatabaseWithChallenges = require('../../support/database.with.levels');
var badge = require('./lib/badge.png.of.player.request');

describe('Png Badge of player request', function() {

    var response = {
        setHeader: function(key, value) { this.headerKey = key; this.headerValue = value; },
    	writeHead: function(statusCode) { this.statusCode = statusCode; },
    	end: function(content, format) { this.content = content; this.format = format; },
        reset: function() { 
            this.headerKey = undefined; 
            this.headerValue = undefined; 
            this.statusCode = undefined;
            this.content = undefined;
            this.format = undefined;
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
            badge({url: '/players/bilou/badge.png'}, response, database, function() {
                done();
            });        
        });
        
        xit('returns 200', function() {
            expect(response.statusCode).toEqual(200);
        });

        xit('sets content-type to png', function() {
            expect(response.headerKey).toEqual('Content-Type');
            expect(response.headerValue).toEqual('image/png');
        });
        
        xit('sends the content as binary', function() {
            expect(response.format).toEqual('binary');
        });
        
        it('builds the expected image', function() {
            var fs = require('fs');
            var expectedContent = fs.readFileSync('app/features/feature.badge.of.player/168421.png', 'binary');
                        
            expect(response.content).toEqual(expectedContent);
        });      
    });    
    
    xdescribe('when the player is unknown', function() {
        
        beforeEach(function(done) {
            badge({url: '/players/unknown/badge.png'}, response, database, function() {
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