module.exports = {
	forEach: function(collection, callback) {
		for(var i=0; i<collection.length; i++) {
			callback(collection[i], i);
		}
	},
	
	first: function(collection, callback) {
		for(var i=0; i<collection.length; i++) {
			if (callback(collection[i])) return collection[i];
		}
	},
	
	hasOneItemIn: function(collection, callback) {
		return this.first(collection, callback) == undefined ? false : true;
	},
	
	firstItemIn: function(collection, matcher) {
		return this.first(collection, matcher);
	}
};