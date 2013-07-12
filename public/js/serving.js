var servecontent = require('./serve-content.js');
var pong         = require('../challenge.ping/pong.js');

serving = function(folder) {
	
	return function (request, response) {
		var params = require('url').parse(request.url, true);
		
		if (params.pathname == '/ping') {
			pong(params, response);
		}
		else {
			servecontent(folder, request, response);
		}
	};
};

module.exports = serving;
