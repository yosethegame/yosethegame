function Server(router) {
	this.router = router;
};

Server.prototype.useRepository = function(repository) {
	this.router.useRepository(repository);
};

Server.prototype.start = function() {
	this.server = require('http').createServer(this.router.gate).listen(process.env.PORT || 5000);		
};

Server.prototype.stop = function() {
	this.server.close();
};

module.exports = Server;