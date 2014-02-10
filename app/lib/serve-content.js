var fs      = require('fs');
var array   = require('../utils/lib/array.utils');

var contentTypes = [
    { extension: 'css', contentType: 'text/css'},
    { extension: 'js', contentType: 'application/javascript'},
    { extension: 'jpeg', contentType: 'image/jpeg'},
    { extension: 'png', contentType: 'image/png'},
    { extension: 'html', contentType: 'text/html'},
    { extension: '', contentType: 'text/plain'}
];

var matching = function(extension) {
    return function(item) { 
        return extension.indexOf(item.extension) != -1; 
    };
};

var extensionOf = function(fileName) {
    var segments = fileName.split('.');
    return segments[segments.length - 1];
};

servecontent = function(folder) {
	
	return function (request, response) {
		var candidate = folder + (request.url == '/' ? '/index.html' : request.url);
		if (fs.existsSync(candidate) && (fs.statSync(candidate).isFile())) {
            var contentType = array.firstItemIn(contentTypes, matching(extensionOf(candidate))).contentType;
            
            response.writeHead(200, { 'Content-Type' : contentType });
			response.write(fs.readFileSync(candidate));			
		} else {
			response.writeHead(404);
		}
		response.end();
	};
	
};

module.exports = servecontent;