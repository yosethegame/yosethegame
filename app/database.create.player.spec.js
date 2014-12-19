var PSql = require('../app/lib/psql.database');
var dropAndCreateTablePlayers = require('./utils/database.drop.and.create.table.players');

describe('Player creation:', function() {
        
	var url = process.env.DATABASE_URL;
	var database = new PSql(url);

    beforeEach(function(done) {
        dropAndCreateTablePlayers(url, function() {
            done();
        });
    });
    
    it('works', function(done) {
        database.createPlayer({login: 'first'}, function() {
            database.createPlayer({login: 'second'}, function() {

                database.playerCount(function(count) {                    
                    expect(count).toEqual(2);
                    done();
                });
            });
        });
    });
    
    it('does not create twice a player with the same login', function(done) {
        var player = { login: 'not-twice' };
    
        database.createPlayer(player, function() {
            database.createPlayer(player, function() {

                database.playerCount(function(count) {                    
                    expect(count).toEqual(1);
                    done();
                });
            });
        });
    });
    
    it('creates the player with an initial score of 0 even if one score is provided', function(done) {
        var player = { login: 'score', score: 100 };
        database.createPlayer(player, function() {
            database.find('score', function(player) {
                expect(player.score).toEqual(0);
                done();
            });
        });
    });
});