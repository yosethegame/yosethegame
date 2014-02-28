var translateIntoNumeral = require('./lib/translate.into.numeral');
var translateIntoRoman = require('./lib/translate.into.roman');

describe('Both ways', function() {
    var data = [
        { roman: 'I', arabic: 1 },
        { roman: 'II', arabic: 2 },
        { roman: 'IV', arabic: 4 },
        { roman: 'V', arabic: 5 },
        { roman: 'VII', arabic: 7 },
        { roman: 'XXIV', arabic: 24 },
        { roman: 'XXXIX', arabic: 39 },
        { roman: 'XLIX', arabic: 49 },
        { roman: 'LII', arabic: 52 },
        { roman: 'XCVIII', arabic: 98 },
        { roman: 'CXXIII', arabic: 123 },
    ];
    
    it('works', function() {
        data.forEach(function(entry) {
            expect(translateIntoNumeral(entry.roman)).toEqual(entry.arabic);
            expect(translateIntoRoman(entry.arabic)).toEqual(entry.roman);
        });
    });
});

describe('Re-ordering dico to translate into roman', function() {
    
    var dico = require('./lib/dico');
    var reordered = translateIntoRoman.reorder(dico);
    
    it('puts 100 first', function() {
        expect(reordered[0].arabic).toEqual(100);
    });
    
    it('puts 90 in second', function() {
        expect(reordered[1].arabic).toEqual(90);
    });
    
});

