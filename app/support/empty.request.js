function EmptyRequest(server) {
	this.server = server;
}

EmptyRequest.prototype.url = function() {
	return this.server;
};

module.exports = EmptyRequest;