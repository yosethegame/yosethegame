var matchers = require('./dashboard.levels.matchers');

describe('Level matchers:', function() {
   
    describe('To be a locked level', function() {
    
        it('reports the class discrepancy', function() {
            matchers.actual = { level: { attr: function() { return 'anything'; }} };
            matchers.toBeALockedLevel();
            var message = matchers.message();
            
            expect(message).toEqual("Expected 'anything' to contain 'level-locked'");
        });
    });
    
    describe('To be playable by', function() {

        var message;
        
        beforeEach(function() {
            matchers.actual = { 
                worldNumber: 12,
                levelNumber: 26,
                levelTitle: 'The best level ever',
                level: { 
                    attr: function() { return 'this class'; },
                    html: function() { return 'this html'; }
                } 
            };
            matchers.toBePlayableBy('you');
            message = matchers.message();
        });
        
        it('reports the class discrepancy', function() {    
            expect(message).toContain('Expected "this class" to contain "level-open"');
        });
        
        it('reports the link discrepancy', function() {
            expect(message).toContain('and "this html" to equal "<a href="/players/you/play/world/12/level/26">The best level ever</a>"');
        });
    });
    
    describe('To be done by', function() {

        var message;
        
        beforeEach(function() {
            matchers.actual = { 
                worldNumber: 18,
                levelNumber: 42,
                levelTitle: 'The best level ever',
                level: { 
                    attr: function() { return 'this other class'; },
                    html: function() { return 'this other html'; }
                } 
            };
            matchers.toBeDoneBy('me');
            message = matchers.message();
        });
        
        it('reports the class discrepancy', function() {    
            expect(message).toContain('Expected "this other class" to contain "level-done"');
        });
        
        it('reports the link discrepancy', function() {
            expect(message).toContain('and "this other html" to equal "<a href="/players/me/display/world/18/level/42">The best level ever</a>"');
        });
    });
});