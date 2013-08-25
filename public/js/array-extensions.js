Array.prototype.forEachItem = function(callback) {
	for(var index=0; index<this.length; index++) {
		callback(this[index]);
	}
};

Array.prototype.select = function(callback) {
	for(var index=0; index<this.length; index++) {
		if (callback(this[index])) return this[index];
	}
};
