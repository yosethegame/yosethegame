beforeEach(function() {

	var toBeALockedLevel = function() {
		var levelClass = this.actual.level.attr('class');
		this.message = function() {
			return "Expected '" + levelClass + "' to contain 'level-locked'";
		};
		return levelClass.indexOf('level-locked') !== -1;
	};
	
	var toBePlayableBy = function(login) {
		var levelClass = this.actual.level.attr('class');
		var expectedLink = '<a href="/players/' + login + '/play/world/' + this.actual.worldNumber + '/level/' + this.actual.levelNumber + '">' + this.actual.levelTitle + '</a>';
		this.message = function() {
			return "Expected '" + levelClass + "' to contain 'level-open' and " +
                   "'" + this.actual.level.html() + "'" +
                   " to equal " + expectedLink;
		};
		return levelClass.indexOf('level-open') !== -1 && this.actual.level.html() == expectedLink;
	};
	
	var toBeDone = function() {
		var levelClass = this.actual.level.attr('class');
		this.message = function() {
			return "Expected '" + levelClass + "' to contain 'level-done' and " +
                    "'" + this.actual.level.html() + "'" + 
                    " to equal '" + this.actual.levelTitle + "'";
		};
		return levelClass.indexOf('level-done') !== -1 && this.actual.level.html() == this.actual.levelTitle;
	};

	this.addMatchers({ 
		toBeALockedLevel: toBeALockedLevel,
		toBePlayableBy: toBePlayableBy, 
		toBeDone: toBeDone });
});

function DashboardLevelMatcherData(page, database) {
	this.database = database;
	this.page = page;
}

DashboardLevelMatcherData.prototype.number = function(world, level) {
	var selector = '#world-' + world + ' ul.level-list li:nth-child(' + level + ')';
	return {
		worldNumber: world,
		levelNumber: level,
		levelTitle : this.database.worlds[world - 1].levels[level - 1].title,
		selector: selector,
		level: this.page(selector)
	};
};

module.exports = DashboardLevelMatcherData;


