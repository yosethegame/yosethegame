var url = require('url');

playground = function(request, response, database) {
	var params = url.parse(request.url, true);	
	response.end();
}

module.exports = playground;