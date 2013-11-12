var fs = require('fs');
var array = require('./utils/array.utils');

servecontent = function(folder) {
	
	return function (request, response) {
		var candidate = folder + (request.url == '/' ? '/index.html' : request.url);
		if (fs.existsSync(candidate) && (fs.statSync(candidate).isFile())) {
            var segments = candidate.split('.');
            var extension = segments[segments.length - 1];
            
            var contentTypes = [
                { extension: 'css', contentType: 'text/css'},
                { extension: 'js', contentType: 'application/javascript'},
                { extension: 'jpeg', contentType: 'image/jpeg'},
                { extension: 'png', contentType: 'image/png'},
                { extension: '', contentType: 'text/plain'}
            ];
            var contentType = array.firstItemIn(contentTypes, function(item) { 
                return extension.indexOf(item.extension) != -1; 
            } ).contentType;
            
            response.writeHead(200, { 'Content-Type' : contentType });
			response.write(fs.readFileSync(candidate));			
		} else {
			response.writeHead(404);
		}
		response.end();
	};
	
};

module.exports = servecontent;