var StringChooser = require('./string.chooser');

function Requester(server) {
	this.server = server;
	this.stringChooser = new StringChooser();
};

Requester.prototype.url = function() {
}

var module = module || {};
module.exports = Requester;