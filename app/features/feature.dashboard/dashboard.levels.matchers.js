var buildMessage = function(login, actual, expectedClass, linksTo) {
    var levelClass = actual.level.attr('class');
    var levelHtml = actual.level.html();
    var expectedLink = '<a href="/players/' + login + linksTo + '/world/' + actual.worldNumber + '/level/' + actual.levelNumber + '">' + actual.levelTitle + '</a>';
 
    return 'Expected "' + levelClass + '" to contain "' + expectedClass + '" and ' +
            '"' + levelHtml + '" to equal "' + expectedLink + '"';
}

var toBeALockedLevel = function() {
	var levelClass = this.actual.level.attr('class');
	this.message = function() { return "Expected '" + levelClass + "' to contain 'level-locked'"; };
    
	return levelClass.indexOf('level-locked') !== -1;
};

var toBePlayableBy = function(login) {
	var levelClass = this.actual.level.attr('class');
    var actualHtml = this.actual.level.html();
	var expectedLink = '<a href="/players/' + login + '/play/world/' + this.actual.worldNumber + '/level/' + this.actual.levelNumber + '">' + this.actual.levelTitle + '</a>';
	this.message = function() { return buildMessage(login, this.actual, 'level-open', '/play'); };
    
	return levelClass.indexOf('level-open') !== -1 && this.actual.level.html() == expectedLink;
};

var toBeDoneBy = function(login) {
	var levelClass = this.actual.level.attr('class');
    var actualHtml = this.actual.level.html();
    var expectedLink = '<a href="/players/' + login + '/display/world/' + this.actual.worldNumber + '/level/' + this.actual.levelNumber + '">' + this.actual.levelTitle + '</a>';
	this.message = function() { return buildMessage(login, this.actual, 'level-done', '/display'); };
    
	return levelClass.indexOf('level-done') !== -1 && this.actual.level.html() == expectedLink;
};

beforeEach(function() {

	this.addMatchers({ 
		toBeALockedLevel: toBeALockedLevel,
		toBePlayableBy: toBePlayableBy, 
		toBeDoneBy: toBeDoneBy });
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
module.exports.toBeALockedLevel = toBeALockedLevel;
module.exports.toBePlayableBy = toBePlayableBy;
module.exports.toBeDoneBy = toBeDoneBy;


