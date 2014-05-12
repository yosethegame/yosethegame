var extractMap = require('./lib/extract.map');

describe('Extract map', function() {
    
    it('transforms url parameter into array', function() {
        expect(extractMap('/any?width=4&map=ABCDEFGH')).toEqual( [ 'ABCD', 'EFGH'] );
    });
});