var ProductionDatabase  = require('./lib/production.database');
var array               = require('./utils/lib/array.utils');

describe('World 6:', function() {
    
    var database = new ProductionDatabase();
    var world = database.worlds[5];
    
    it('is locked for players with empty portfolio', function() {
        expect(world.isOpenFor({})).toBe(false);
    });

    it('is unlocked when player has completed level id:25', function() {
        var player = { portfolio: [ { server: 'any', achievements: [25] } ] };

        expect(world.isOpenFor(player)).toBe(true);
    });
    
    describe('first level', function() {
    
        var level = world.levels[0];
        
        it('has id 33', function() {
            expect(level.id).toEqual(33);
        });
        
        it('is locked when player has not achieved level 25', function() {
            var player = { portfolio: [ { server: 'any', achievements: [] } ] };
            
            expect(level.isOpenLevelFor(player)).toEqual(false);
        });
        
        it('is unlocked when player has achieved level 25', function() {
            var player = { portfolio: [ { server: 'any', achievements: [25] } ] };
            
            expect(level.isOpenLevelFor(player)).toEqual(true);
        });
    });
    
    describe('second level', function() {
    
        var level = world.levels[1];
        
        it('has id 34', function() {
            expect(level.id).toEqual(34);
        });
        
        it('is locked when player has not achieved level 33', function() {
            var player = { portfolio: [ { server: 'any', achievements: [] } ] };
            
            expect(level.isOpenLevelFor(player)).toEqual(false);
        });
        
        it('is unlocked when player has achieved level 33', function() {
            var player = { portfolio: [ { server: 'any', achievements: [33] } ] };
            
            expect(level.isOpenLevelFor(player)).toEqual(true);
        });
    });
    
    describe('third level', function() {
    
        var level = world.levels[2];
        
        it('has id 35', function() {
            expect(level.id).toEqual(35);
        });
        
        it('is locked when player has not achieved level 34', function() {
            var player = { portfolio: [ { server: 'any', achievements: [] } ] };
            
            expect(level.isOpenLevelFor(player)).toEqual(false);
        });
        
        it('is unlocked when player has achieved level 34', function() {
            var player = { portfolio: [ { server: 'any', achievements: [34] } ] };
            
            expect(level.isOpenLevelFor(player)).toEqual(true);
        });
    });

});
