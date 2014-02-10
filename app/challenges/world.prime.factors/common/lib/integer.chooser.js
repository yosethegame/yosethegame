function Chooser() {
	
	this.getNumber = function() {
		return Math.floor(Math.random()*10000) + 2;
	};
	
}

var module = module || {};
module.exports = Chooser;