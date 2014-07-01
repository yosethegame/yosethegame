var equal = require('deep-equal');
var urlParser = require('url');
var array = require('../../../../utils/lib/array.utils');

var withMap = function(map) {
	return function(item) {
		return equal(item.map, map);
	};
};

var findCandidate = function(url, candidates) {
    var query = urlParser.parse(url, true).query;
    var map = query.map;
	
	return array.firstItemIn(candidates, withMap(map));
};

module.exports = findCandidate;
