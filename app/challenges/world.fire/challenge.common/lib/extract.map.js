var urlParser  = require('url');

var extractMap = function(url) {
    var query = urlParser.parse(url, true).query;
    var mapWidth = query.width;
    var regex = new RegExp('.{' + mapWidth + '}', 'g');

    return query.map.match(regex);
};

module.exports = extractMap;