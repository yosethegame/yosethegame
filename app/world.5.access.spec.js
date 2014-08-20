var ProductionDatabase  = require('./lib/production.database');
var array               = require('./utils/lib/array.utils');

describe('World 5', function() {
    
    var world;
    
    beforeEach(function() {
        var database = new ProductionDatabase();
        world = database.worlds[4];
    });

    it('is locked for players with empty portfolio', function() {
        expect(world.isOpenFor({})).toBe(false);
    });

    it('is unlocked when player has completed level id:12', function() {
        var player = { portfolio: [ { server: 'any', achievements: [12] } ] };

        expect(world.isOpenFor(player)).toBe(true);
    });

});
