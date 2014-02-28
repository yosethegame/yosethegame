var dico = require('./dico');

var translateIntoNumeral = function(roman) {
    for (var i=0; i<dico.length; i++) {
        var entry = dico[i];
        if (roman.substring(0, entry.roman.length) == entry.roman) {
            return entry.arabic + translateIntoNumeral(roman.substring(entry.roman.length));
        }
    }
    return 0;
};

module.exports = translateIntoNumeral;