var PSql = require('../app/lib/psql.database');
var dropAndCreateTablePlayers = require('./utils/database.drop.and.create.table.players');

describe('Player search:', function() {
        
	var url = process.env.DATABASE_URL;
	var database = new PSql(url);
    var players;
    
    beforeEach(function(done) {
        dropAndCreateTablePlayers(url, function() {
            database.createPlayer({login: 'first', tag: 'laval quebec' }, function() {
                database.createPlayer({login: 'second', tag: 'montreal quebec' }, function() {
                    database.createPlayer({login: 'third', tag: 'ottawa ontario' }, function() {

                        database.findPlayersMatching('quebec', function(found) {                    
                            players = found;
                            done();
                        });
                    });
                });
            });            
        });
    });
    
    it('works', function() {
        expect(players.length).toEqual(2);
    });
    
    it('returns a list sorted by score', function(done) {
        database.savePlayer({ login: 'first', score: 100, tag: 'laval quebec'}, function() {
            database.savePlayer({ login: 'second', score: 200, tag: 'montreal quebec'}, function() {
            
                database.findPlayersMatching('quebec', function(found) {                    
                    expect(found[0].login).toEqual('second');
                    done();
                });
            });            
        });
    });
    
});