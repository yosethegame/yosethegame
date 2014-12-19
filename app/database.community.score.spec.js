var PSql = require('../app/lib/psql.database');
var dropAndCreateTablePlayers = require('./utils/database.drop.and.create.table.players');

describe('Community score', function() {
        
	var url = process.env.DATABASE_URL;
	var database = new PSql(url);
    var players;
    
    beforeEach(function(done) {
        dropAndCreateTablePlayers(url, function() {
            database.createPlayer({login: 'first', tag: 'laval quebec' }, function() {
                database.createPlayer({login: 'second', tag: 'montreal quebec' }, function() {

                    done();
                });
            });            
        });
    });
    
    it('sums the score of all players', function(done) {
        database.savePlayer({ login: 'first', score: 100, tag: 'laval quebec'}, function() {
            database.savePlayer({ login: 'second', score: 200, tag: 'montreal quebec'}, function() {
            
                database.getScoreCommunity(function(score) {                    
                    expect(score).toEqual(300);
                    done();
                });
            });            
        });
    });
    
});