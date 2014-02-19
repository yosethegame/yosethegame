var fs = require('fs');
var cheerio = require('cheerio');

describe('World template', function() {
    
    var file, template;
    
    beforeEach(function() {
        file = fs.readFileSync('./app/features/feature.dashboard/lib/world.html').toString();
        template = cheerio.load(file);
    });
    
    it('can be read', function() {
        expect(file.length).toBeGreaterThan(0);
    });
    
    describe('world-ellipse', function() {
        
        it('exists', function() {
            expect(template('.world-ellipse').length).toEqual(1);
        });

        it('contains a completed checkbox', function() {
            expect(template('.world-ellipse .glyphicon-ok').length).toEqual(1);
        });

        it('contains a placeholder for the world name', function() {
            expect(template('.world-ellipse .world-name').length).toEqual(1);
        });
    });
    
    describe('world-detail', function() {
        
        it('exists', function() {
            expect(template('.world-detail').length).toEqual(1);
        });

        it('contains a restart-world-link', function() {
            expect(template('.world-detail .restart-world-link').length).toEqual(1);
        });

        it('contains a rerun-world-link', function() {
            expect(template('.world-detail .rerun-world-link').length).toEqual(1);
        });

        it('contains a level-list', function() {
            expect(template('.world-detail .level-list').length).toEqual(1);
        });
    });    
});