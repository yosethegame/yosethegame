beforeEach(function() {

	var toBeALockedWorld = function() {
		var actual = this.actual.html;
		var expected = "'" + this.actual.worldName + "' and 'lock'";
		this.message = function() {
			return "Expected '" + actual + "' to contain " + expected + " in " + this.actual.selector;
		};
		return actual.indexOf(this.actual.worldName) != -1 && actual.indexOf('lock') != -1;
	};
	
	var toBeOpen = function() {
		var actual = this.actual.html;
		var expected = this.actual.worldName;
		this.message = function() {
			return "Expected '" + actual + "' to equal '" + expected + "'";
		};
		return actual == expected;
	};
	
	var toHaveLevelCount = function(expected) {
		var actual = this.actual.levelCount;
		this.message = function() {
			return "Expected " + actual + " to equal " + expected + ' (number of lines displayed for world ' + this.actual.index + ')';
		};
		return actual == expected;
	};
	
	var toHaveProgressBarOf = function(expected) {
		var actual = this.actual.progress;
		this.message = function() {
			return "Expected '" + actual + "' to equal 'width:" + expected + "'";
		};
		return actual == 'width:' + expected;
	};

	this.addMatchers({ 
		toBeALockedWorld: toBeALockedWorld, 
		toBeOpen: toBeOpen, 
		toHaveLevelCount: toHaveLevelCount, 
		toHaveProgressBarOf: toHaveProgressBarOf 
	});
});

function DashboardWorldMatcherData(page, database) {
	this.database = database;
	this.page = page;
}

DashboardWorldMatcherData.prototype.number = function(index) {
	var selector = 'table#worlds tr:nth-child(' + index + ') td:nth-child(1)';
	return {
		index: index,
		worldName: this.database.worlds[index -1].name,
		selector: selector,
		levelCount: this.page('table#worlds tr:nth-child(' + index + ') td:nth-child(2) ul.levels li').length,
		progress: this.page('table#worlds tr:nth-child(' + index + ') td:nth-child(2) .progress-bar').attr('style'),
		html:  this.page(selector).html()
	};
};

module.exports = DashboardWorldMatcherData;


