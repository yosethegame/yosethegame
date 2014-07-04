var equal = require('deep-equal');
var urlParser = require('url');
var array = require('../../../../utils/lib/array.utils');
var extractMap = require('./extract.map');

var withMap = function(map) {
	return function(item) {
		return equal(item.map, map);
	};
};

var findCandidate = function(url, candidates) {
    var map = extractMap(url);
	
	return array.firstItemIn(candidates, withMap(map));
};

module.exports = findCandidate;
