function Chooser() {
	
	this.getNumber = function() {
		return 1 - Math.floor(Math.random()*10000);
	};
	
};

var module = module || {};
module.exports = Chooser;