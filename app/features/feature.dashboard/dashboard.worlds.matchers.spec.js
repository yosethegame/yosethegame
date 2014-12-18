var matchers = require('./dashboard.worlds.matchers');

describe('World matchers:', function() {
   
    describe('To be a locked world', function() {
    
        var message;
    
        beforeEach(function() {
            matchers.actual = { 
                ellipse: { attr: function() { return 'ellipse class'; } },
                worldDetail: { attr: function() { return 'world detail class'; } }
            };
            matchers.toBeALockedWorld();
            message = matchers.message();
        });
    
        it('reports the ellipse class discrepancy', function() {
            expect(message).toContain("Expected 'ellipse class' to contain 'world-locked'");
        });
        
        it('reports the world detail class discrepancy', function() {
            expect(message).toContain("and 'world detail class' to contain 'hidden'");
        });
    });
    
    describe('To be an open world', function() {
    
        var message;
    
        beforeEach(function() {
            matchers.actual = { 
                ellipse: { attr: function() { return 'ellipse class'; } },
                worldDetail: { attr: function() { return 'world detail class'; } }
            };
            matchers.toBeOpen();
            message = matchers.message();
        });
    
        it('reports the ellipse class discrepancy', function() {
            expect(message).toContain("Expected 'ellipse class' to contain 'world-open'");
        });
        
        it('reports the world detail class discrepancy', function() {
            expect(message).toContain("and 'world detail class' to contain 'visible'");
        });
    });
    
    describe('To be a completed world', function() {
    
        var message;
    
        beforeEach(function() {
            matchers.actual = { 
                ellipse: { attr: function() { return 'ellipse class'; } },
                worldDetail: { attr: function() { return 'world detail class'; } }
            };
            matchers.toBeCompleted();
            message = matchers.message();
        });
    
        it('reports the ellipse class discrepancy', function() {
            expect(message).toContain("Expected 'ellipse class' to contain 'world-completed'");
        });
        
        it('reports the world detail class discrepancy', function() {
            expect(message).toContain("and 'world detail class' to contain 'visible'");
        });
    });
    
    describe('To have level count', function() {
    
        var message;
    
        beforeEach(function() {
            matchers.actual = { 
                worldName: 'this name',
                levelCount: 12
            };
            matchers.toHaveLevelCount(26);
            message = matchers.message();
        });
    
        it('reports the count discrepancy', function() {
            expect(message).toEqual("Expected 12 to equal 26 (number of lines displayed for world 'this name')");
        });
    });
});