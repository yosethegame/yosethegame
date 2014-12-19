var PSql = require('../app/lib/psql.database');
var dropAndCreateTablePlayers = require('./utils/database.drop.and.create.table.players');

describe('Find player', function() {
        
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
    
    it('can find a player by its login', function(done) {
        database.find('first', function(player) {                    
            expect(player.login).toEqual('first');
            done();
        });
    });
    
    it('returns undefined when not found', function(done) {
        database.find('unknown', function(player) {                    
            expect(player).toEqual(undefined);
            done();
        });
    });
    
    it('can find all players', function(done) {
        database.allPlayers(function(players) {
            expect(players.length).toEqual(2);
            done();
        });
    });
});