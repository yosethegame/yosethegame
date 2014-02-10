var ProductionDatabase = require('./lib/production.database');
var fs = require('fs');
var array = require('./utils/lib/array.utils');
var cheerio = require('cheerio');

describe('Levels html sources', function() {
	
	var database;
	
	beforeEach(function() {
		database = new ProductionDatabase();
	});

    it('must have a #challenge-assignment element', function() {
		array.forEach(database.worlds, function(world) {
			array.forEach(world.levels, function(level) {
			    var challenge = cheerio.load(fs.readFileSync(level.file).toString());
				if (challenge('#challenge-assignment').length == 0) {
					throw 'Missing element #challenge-assignment in File "' + level.file + '" of level "' + level.title + '"';
				}
			});
	    });
    });
    
    it('must have a #challenge-details element', function() {
		array.forEach(database.worlds, function(world) {
			array.forEach(world.levels, function(level) {
			    var challenge = cheerio.load(fs.readFileSync(level.file).toString());
				if (challenge('#challenge-details').length == 0) {
					throw 'Missing element #challenge-details in File "' + level.file + '" of level "' + level.title + '"';
				}
			});
	    });
    });
    
    it('must have a #challenge-tips element', function() {
		array.forEach(database.worlds, function(world) {
			array.forEach(world.levels, function(level) {
			    var challenge = cheerio.load(fs.readFileSync(level.file).toString());
				if (challenge('#challenge-tips').length == 0) {
					throw 'Missing element #challenge-tips in File "' + level.file + '" of level "' + level.title + '"';
				}
			});
	    });
    });
    
});