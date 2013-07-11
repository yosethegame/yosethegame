var fs = require('fs');
var request = require('request');

serving = function(folder) {
	
	return function (req, response) {
		var params = require('url').parse(req.url, true);
		if (params.pathname == '/ping') {
			request(params.query.server, function(error, resp, body) {
				if (error != null) {
					response.writeHead(404);
				}
				if (body != null) {
					response.write(body);
				}
				response.end();
			});
		}
		else {
			var candidate = folder + (req.url == '/' ? '/index.html' : req.url);
			if (fs.existsSync(candidate) && (fs.statSync(candidate).isFile())) {
				response.write(fs.readFileSync(candidate));			
			} else {
				response.writeHead(404);
			}
			response.end();			
		}
	};
};

module.exports = serving;
