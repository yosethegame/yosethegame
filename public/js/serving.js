var fs = require('fs');

serving = function(folder) {
	
	return function (request, response) {
		var candidate = folder + (request.url == '/' ? '/index.html' : request.url);
		if (fs.existsSync(candidate) && (fs.statSync(candidate).isFile())) {
			response.write(fs.readFileSync(candidate));			
		} else {
			response.writeHead(404);
		}
		response.end();			
	};
};

module.exports = serving;
