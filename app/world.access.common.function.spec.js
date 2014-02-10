var isWorldOpenFor = require('./lib/production.database').isWorldOpenFor;

describe('World access', function() {

    var world;
   
    beforeEach(function() {
        world = { isOpenFor: isWorldOpenFor };
    });
   
    it('is closed when all levels are closed', function() {
        world.levels = [
               { id: 1, isOpenLevelFor: function(player) { return false; }},
               { id: 2, isOpenLevelFor: function(player) { return false; }}
        ];
        
        expect(world.isOpenFor({})).toBe(false);
    });
   
    it('is open when one level is open', function() {
        world.levels = [
               { id: 1, isOpenLevelFor: function(player) { return false; }},
               { id: 2, isOpenLevelFor: function(player) { return true; }}
        ];
        
        expect(world.isOpenFor({})).toBe(true);
    });
   
});