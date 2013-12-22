var isArray = function(o) {
    return o instanceof Array;
};

describe('isArray', function() {
    
    it('returns false for an integer', function() {
        expect(isArray(1)).toEqual(false);
    });
    
    it('returns false for a string', function() {
        expect(isArray("42")).toEqual(false);
    });
    
    it('returns true for a empty array', function() {
        expect(isArray([])).toEqual(true);
    });
    
});