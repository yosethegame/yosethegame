var removeTrailingSlashOf = require('../../../common/lib/remove.trailing.slash');
var StringChooser = require('../../common/lib/string.chooser');

function Requester(server) {
	this.server = removeTrailingSlashOf(server);
	this.stringChooser = new StringChooser();
}

Requester.prototype.url = function() {
	return this.server + '/primeFactors?number=' + this.stringChooser.getString();
};

var module = module || {};
module.exports = Requester;