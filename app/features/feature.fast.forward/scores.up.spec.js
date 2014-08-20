var cheerio     = require('cheerio');
var Data        = require('../../support/database.with.levels');
var fastforward = require('./lib/fast.forward.request.js');
var response    = require('../../support/fake.response');

describe('Fast-forwarding', function() {
    
    var database = new Data();
    var player;
    var remote;
    
    beforeEach(function(done) { 
        remote = require('http').createServer(
            function (request, response) {
                response.writeHead(200);
                response.end();
            })
        .listen(6000, done);
    });
    
    afterEach(function() {
        remote.close();
    });
    
    it('scores up the passed level', function(done) {
        database.worlds[0].isOpenFor = function(player) { return true; };
        database.worlds[0].levels[0].checker = '../../../support/response.always.valid';
        database.worlds[0].levels[1].checker = '../../../support/response.always.valid';
        player = {
            login: 'ericminio',
            score: 0,
            portfolio: [ { server: 'http://localhost:6000', achievements: [] } ]
        };
        database.players = [ player ];
        fastforward({ url: '/players/ericminio/fastforward/world/1' }, response, database, function() {
            expect(player.score).toEqual(20);
            done();
        });
    });
    
});
