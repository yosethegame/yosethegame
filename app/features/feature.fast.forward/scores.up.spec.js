var cheerio     = require('cheerio');
var Data        = require('../../support/database.with.levels');
var fastforward = require('./lib/fast.forward.request.js');
var response    = require('../../support/fake.response');

describe('Fast-forwarding', function() {
    
    var remote;
    var port = 6000;
    var request = { url: '/players/ericminio/fastforward/world/1' };
    var database = new Data();
    var player;
    
    beforeEach(function(done) { 
        player = {
            login: 'ericminio',
            score: 0,
            portfolio: [ { server: 'http://localhost:' + port, achievements: [] } ]
        };
        database.players = [ player ];
        database.worlds[0].isOpenFor = function(player) { return true; };
        database.worlds[0].levels[0].checker = '../../../support/response.always.valid';
        database.worlds[0].levels[1].checker = '../../../support/response.always.valid';

        remote = require('http').createServer(function (request, response) { response.end(); }).listen(port, done);
    });
    
    afterEach(function() {
        remote.close();
    });
    
    it('scores up the passed levels', function(done) {
        fastforward(request, response, database, function() {
            expect(player.score).toEqual(20);
            done();
        });
    });
    
    it('does not score up the failing levels', function(done) {
        database.worlds[0].levels[1].checker = '../../../support/response.always.501';
        fastforward(request, response, database, function() {
            expect(player.score).toEqual(10);
            done();
        });
    });
    
    it('does not score up an already passed level', function(done) {
        player.portfolio[0].achievements = [1];
        fastforward(request, response, database, function() {
            expect(player.score).toEqual(10);
            done();
        });
    });
    
    it('stops after the first failing level', function(done) {
        database.worlds[0].levels[0].checker = '../../../support/response.always.501';
        fastforward(request, response, database, function() {
            expect(player.score).toEqual(0);
            done();
        });
    });
});
