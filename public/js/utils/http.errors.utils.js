module.exports = {
	notFound: function(response) {
		response.writeHead(404);
		response.end();
	},

	badRequest: function(response) {
		response.writeHead(400);
		response.end();
	},
	
	methodNotAllowed: function(response) {
		response.writeHead(405);
		response.end();
	},
	
	unauthorized: function(response) {
		response.writeHead(401);
		response.end();
	}
}