function Chooser() {
	
	this.getNumber = function() {
		var index = Math.floor(Math.random()*10);
		return [2, 4, 8, 16, 64, 128, 256, 512, 1024, 2048][index];
	};
	
};

var module = module || {};
module.exports = Chooser;