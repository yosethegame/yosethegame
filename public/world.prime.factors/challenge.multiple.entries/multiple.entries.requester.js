var removeTrailingSlashOf = require('../../levels.common/remove.trailing.slash');
var IntegerChooser = require('../../levels.common/integer.chooser');
var StringChooser = require('../../levels.common/string.chooser');

function Requester(server) {
	this.server = removeTrailingSlashOf(server);
	this.numberChooser = new IntegerChooser();
	this.stringChooser = new StringChooser();
}

Requester.prototype.url = function() {
	return this.server + '/primeFactors?' +
							'number=' + this.numberChooser.getNumber() +
							'&number=' + this.numberChooser.getNumber() +
							'&number=' + this.stringChooser.getString()
           ;
};

var module = module || {};
module.exports = Requester;