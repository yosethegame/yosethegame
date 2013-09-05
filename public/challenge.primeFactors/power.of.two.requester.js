var Chooser = require('./power.of.two.chooser');

function Requester(options) {
	this.options = options;
	this.numberChooser = new Chooser();
};

Requester.prototype.url = function() {
	return this.options.query.server + '?number=' + this.numberChooser.getNumber();
}

var module = module || {};
module.exports = Requester;