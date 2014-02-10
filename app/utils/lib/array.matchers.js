module.exports = {
	fileEqualsTo: function(name) {
		return function(item) {
			return item.file == name;
		};
	},
	
	titleEqualsTo: function(title) {
		return function(item) {
			return item.title == title;
		};
	},
	
	equalsTo: function(value) {
		return function(item) {
			return item == value;
		};
	}
};