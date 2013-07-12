var request = require('request');

pong = function(incoming, response) {
	var params = require('url').parse(incoming.url, true);
	request(params.query.server, function(error, remoteResponse, content) {
		if (error != null) {
			response.writeHead(404);
			response.end();
			return;
		}

		if (remoteResponse.headers['content-type'] != 'application/json'
			|| content != JSON.stringify({ alive: true }) ) {
				
			var remoteResponseHeader = remoteResponse.headers['content-type'] ==undefined ? 
					'text/plain':  remoteResponse.headers['content-type'];
					
			response.writeHead(501);
			response.write(JSON.stringify({
				expected: {
						'content-type': 'application/json',
						body: { alive: true }
					},
					got: {
						'content-type': remoteResponseHeader,
						body: content
					}
				}));
		}
		response.end();
	});
};

module.exports = pong;