var reorder = function(dico) {
    return dico.sort(function(a, b) {
        return a.arabic < b.arabic;
    });
};

var dico = reorder(require('./dico'));

var translateIntoRoman = function(arabic) {
    for (var i=0; i<dico.length; i++) {
        var entry = dico[i];
        if (arabic >= entry.arabic) {
            return entry.roman + translateIntoRoman(arabic - entry.arabic);
        }
    }
    return '';
};

module.exports = translateIntoRoman;
module.exports.reorder = reorder;