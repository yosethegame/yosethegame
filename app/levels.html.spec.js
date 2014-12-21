var ProductionDatabase = require('./lib/production.database');
var fs = require('fs');
var array = require('./utils/lib/array.utils');
var cheerio = require('cheerio');

var checkChallengeAssignmentSectionExistance = function(database) {    
	array.forEach(database.worlds, function(world) {
		array.forEach(world.levels, function(level) {
            var challenge = cheerio.load(fs.readFileSync(level.file).toString());
			if (challenge('#challenge-assignment').length === 0) {
				throw 'Missing element #challenge-assignment in File "' + level.file + '" of level "' + level.title + '"';
			}
		});
    });
};

var checkChallengeDetailsSectionExistance = function(database) {
    array.forEach(database.worlds, function(world) {
    	array.forEach(world.levels, function(level) {
            var challenge = cheerio.load(fs.readFileSync(level.file).toString());
    		if (challenge('#challenge-details').length === 0) {
    			throw 'Missing element #challenge-details in File "' + level.file + '" of level "' + level.title + '"';
    		}
    	});
    });    
};

var checkChallengeTipsSectionExistance = function(database) {
	array.forEach(database.worlds, function(world) {
		array.forEach(world.levels, function(level) {
            var challenge = cheerio.load(fs.readFileSync(level.file).toString());
			if (challenge('#challenge-tips').length === 0) {
				throw 'Missing element #challenge-tips in File "' + level.file + '" of level "' + level.title + '"';
			}
		});
    });    
};

describe('Level html Checkers', function() {
    
    it('can detect a missing #challenge-assignment element', function() {
        var content =  '<html><body>' +
                        '<div id="challenge-details">those details</div>' +
                        '<div id="challenge-tips">those tips</div>' +
                      '</body></html>';
        fs.writeFileSync('test-data/level-content', content);
        var database = {
            worlds: [
                { levels: [
                    {
                        title: 'a first level',
                        file: 'test-data/level-content'
                    }
                ]}
            ]
        };
        try {        
            checkChallengeAssignmentSectionExistance(database);
        }
        catch (error) {
            expect(error).toEqual('Missing element #challenge-assignment in File "test-data/level-content" of level "a first level"');
        }
    });

    it('can detect a missing #challenge-details element', function() {
        var content =  '<html><body>' +
                        '<div id="challenge-assignment">this assignment</div>' +
                        '<div id="challenge-tips">those tips</div>' +
                      '</body></html>';
        fs.writeFileSync('test-data/level-content', content);
        var database = {
            worlds: [
                { levels: [
                    {
                        title: 'a first level',
                        file: 'test-data/level-content'
                    }
                ]}
            ]
        };
        try {        
            checkChallengeDetailsSectionExistance(database);
        }
        catch (error) {
            expect(error).toEqual('Missing element #challenge-details in File "test-data/level-content" of level "a first level"');
        }
    });

    it('can detect a missing #challenge-tips element', function() {
        var content =  '<html><body>' +
                        '<div id="challenge-assignment">this assignment</div>' +
                        '<div id="challenge-details">those details</div>' +
                      '</body></html>';
        fs.writeFileSync('test-data/level-content', content);
        var database = {
            worlds: [
                { levels: [
                    {
                        title: 'a first level',
                        file: 'test-data/level-content'
                    }
                ]}
            ]
        };
        try {        
            checkChallengeTipsSectionExistance(database);
        }
        catch (error) {
            expect(error).toEqual('Missing element #challenge-tips in File "test-data/level-content" of level "a first level"');
        }
    });
});

describe('Production Levels html sources', function() {
	
	var database;
	
	beforeEach(function() {
		database = new ProductionDatabase();
	});

    it('must have a #challenge-assignment element', function() {
        checkChallengeAssignmentSectionExistance(database);
    });
    
    it('must have a #challenge-details element', function() {
        checkChallengeDetailsSectionExistance(database);
    });
    
    it('must have a #challenge-tips element', function() {
        checkChallengeTipsSectionExistance(database);
    });
});