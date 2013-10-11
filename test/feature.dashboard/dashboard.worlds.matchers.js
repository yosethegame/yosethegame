beforeEach(function() {

	var toBeLocked = function() {
		var actual = this.actual.html;
		var expected = '<img src="/img/locker.png" width="60" height="60" class="img-responsive">';
		this.message = function() {
			return "Expected '" + actual + "' to contain '" + expected + "'";
		}
		return actual.indexOf(expected) != -1;
	};
	
	var toBeOpen = function() {
		var actual = this.actual.html;
		var expected = this.actual.worldName;
		this.message = function() {
			return "Expected '" + actual + "' to equal '" + expected + "'";
		}
		return actual == expected;
	};

	this.addMatchers({ toBeLocked: toBeLocked, toBeOpen: toBeOpen });
});

function DashboardWorldMatcherData(page, database) {
	this.database = database;
	this.page = page;
};
DashboardWorldMatcherData.prototype.number = function(index) {
	return {
		index: index,
		worldName: this.database.worlds[index -1].name,
		html:  this.page('table#worlds tr:nth-child(' + index + ') td:nth-child(1)').html()
	};
};

module.exports = DashboardWorldMatcherData;


