var fs = require('fs');
var pong = require('../challenge.ping/pong.js');

serving = function(folder) {
	
	return function (req, response) {
		var params = require('url').parse(req.url, true);
		if (params.pathname == '/ping') {
			pong(params, response);
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
