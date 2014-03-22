var error501   = require('../../../common/lib/501');
var equal      = require('deep-equal');
var extractMap = require('./extract.map');

var answerHasMap = function(url, answer, callback) {
    
    if (answer === null || answer.map === undefined) {
        callback(error501.withValues('A Json object with map and moves', 'missing field "map"'));
        return false;
    }
    var sentMap = extractMap(url);
    if (!equal(answer.map, sentMap)) {
        callback(error501.withValues('A Json object with map = ' + JSON.stringify(sentMap), 'map = ' + JSON.stringify(answer.map)));
        return false;
    }

    return true;
};

module.exports = answerHasMap;