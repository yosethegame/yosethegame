var toBeALockedWorld = function() {
    var ellipseClass = this.actual.ellipse.attr('class');
    var worldDetailClass = this.actual.worldDetail.attr('class');
	this.message = function() {
		return "Expected '" + ellipseClass + "' to contain 'world-locked' and '" + worldDetailClass +"' to contain 'hidden'";
	};
	return ellipseClass.indexOf('world-locked') != -1 && worldDetailClass.indexOf('hidden') != -1;
};

var toBeOpen = function() {
    var ellipseClass = this.actual.ellipse.attr('class');
    var worldDetailClass = this.actual.worldDetail.attr('class');
	this.message = function() {
		return "Expected '" + ellipseClass + "' to contain 'world-open' and '" + worldDetailClass +"' to contain 'visible'";
	};
	return ellipseClass.indexOf('world-open') != -1 && worldDetailClass.indexOf('visible') != -1;
};

var toBeCompleted = function() {
    var ellipseClass = this.actual.ellipse.attr('class');
    var worldDetailClass = this.actual.worldDetail.attr('class');
	this.message = function() {
		return "Expected '" + ellipseClass + "' to contain 'world-completed' and '" + worldDetailClass +"' to contain 'visible'";
	};
	return ellipseClass.indexOf('world-completed') != -1 && worldDetailClass.indexOf('visible') != -1;
};

var toHaveLevelCount = function(expected) {
	var actual = this.actual.levelCount;
	this.message = function() {
		return "Expected " + actual + " to equal " + expected + " (number of lines displayed for world '" + this.actual.worldName + "')";
	};
	return actual == expected;
};

beforeEach(function() {

	this.addMatchers({ 
		toBeALockedWorld: toBeALockedWorld, 
		toBeOpen: toBeOpen, 
		toHaveLevelCount: toHaveLevelCount, 
		toBeCompleted: toBeCompleted,
	});
});

function DashboardWorldMatcherData(page, database) {
	this.database = database;
	this.page = page;
}

DashboardWorldMatcherData.prototype.number = function(index) {
	var selector = '#world-' + index;
	return {
		index: index,
		worldName: this.database.worlds[index -1].name,
		selector: selector,
		ellipse: this.page(selector + ' .world-ellipse'),
		worldDetail: this.page(selector + ' .world-detail'),
		levelCount: this.page(selector + ' .world-detail ul.level-list li').length,
		html:  this.page(selector).html()
	};
};

module.exports = DashboardWorldMatcherData;
module.exports.toBeALockedWorld = toBeALockedWorld;
module.exports.toBeOpen = toBeOpen;
module.exports.toBeCompleted = toBeCompleted;
module.exports.toHaveLevelCount = toHaveLevelCount;


