function Server(router) {
	this.router = router;
};

Server.prototype.useDatabase = function(database) {
	this.database = database;
};

Server.prototype.start = function() {
	var router = this.router;
    var database = this.database;
	this.server = require('http').createServer(function(request, response) {
    	router.endPointOf(request)(request, response, database);
    }).listen(process.env.PORT || 5000);
};

Server.prototype.stop = function() {
	this.server.close();
};

module.exports = Server;