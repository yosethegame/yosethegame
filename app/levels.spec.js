var ProductionDatabase = require('./lib/production.database');
var fs = require('fs');
var array = require('./utils/lib/array.utils');

var checkThatAllLevelFilesExist = function(database) {
	array.forEach(database.worlds, function(world) {
		array.forEach(world.levels, function(level) {
			if (!fs.existsSync(level.file)) {
				throw 'File "' + level.file + '" of level "' + level.title + '" not found';
			}
		});
    });    
};

var checkThatRequestersAreReachable = function(database) {
	array.forEach(database.worlds, function(world) {
		array.forEach(world.levels, function(level) {
            try {
                var requester = './features/feature.try/lib/' + level.requester;
                require(requester);
            }
            catch (error) {
                throw 'Requester ' + level.requester + ' of level "' + level.title + '" should be requirable from ./features/feature.try/lib';
            }
        });
    });    
};

var checkThatRequestersExposeAnUrlMethod = function(database) {
	array.forEach(database.worlds, function(world) {
		array.forEach(world.levels, function(level) {
            var Requester = require('./features/feature.try/lib/' + level.requester);
            var requester = new Requester();
            if (requester.url === undefined) {
                throw 'Requester ' + level.requester + ' of level "' + level.title + '" should have an url() method';
            }
        });
    });
};

var checkThatCheckersAreReachable = function(database) {
	array.forEach(database.worlds, function(world) {
		array.forEach(world.levels, function(level) {
            try {
                var checker = './features/feature.try/lib/' + level.checker;
                require(checker);
            }
            catch (error) {
                throw 'Checker ' + level.checker + ' of level "' + level.title + '" should be requirable from ./features/feature.try/lib';
            }
        });
    });    
};

var checkThatCheckersExposeAnValidateMethod = function(database) {    
	array.forEach(database.worlds, function(world) {
		array.forEach(world.levels, function(level) {
            var checker = require('./features/feature.try/lib/' + level.checker);
            if (checker.validate === undefined) {
                throw 'Checker ' + level.checker + ' of level "' + level.title + '" should have an validate() method';
            }
        });
    });
};

describe('Level checkers', function() {
   
    it('can detect a missing level file', function() {
        var database = {
            worlds: [
                {
                    levels: [
                        {
                            title: 'this level',
                            file: 'test-data/file-existance-checker'
                        }
                    ]
                }
            ]
        };
        try {
            checkThatAllLevelFilesExist(database);
        }
        catch (error) {
            expect(error).toEqual('File "test-data/file-existance-checker" of level "this level" not found');
        }
    });
    
    it('can detect a not reachable requester', function() {
        var database = {
            worlds: [
                {
                    levels: [
                        {
                            title: 'great level',
                            requester: '../this.requester.js'
                        }
                    ]
                }
            ]
        };
        try {
            checkThatRequestersAreReachable(database);
        }
        catch (error) {
            expect(error).toEqual('Requester ../this.requester.js of level "great level" should be requirable from ./features/feature.try/lib');
        }
    });

    it('can detect when a requester is missing the url() method', function() {
        fs.writeFileSync('test-data/this-requester.js', 'module.exports = function(server) {};');
        var database = {
            worlds: [
                {
                    levels: [
                        {
                            title: 'this great level',
                            requester: '../../../../test-data/this-requester.js'
                        }
                    ]
                }
            ]
        };
        try {
            checkThatRequestersExposeAnUrlMethod(database);
        }
        catch (error) {
            expect(error).toEqual('Requester ../../../../test-data/this-requester.js of level "this great level" should have an url() method');
        }
    });
    
    it('can detect a not reachable checker', function() {
        var database = {
            worlds: [
                {
                    levels: [
                        {
                            title: 'great level',
                            checker: '../this.checker.js'
                        }
                    ]
                }
            ]
        };
        try {
            checkThatCheckersAreReachable(database);
        }
        catch (error) {
            expect(error).toEqual('Checker ../this.checker.js of level "great level" should be requirable from ./features/feature.try/lib');
        }
    });
    
    it('can detect when a checker is missing the validate() method', function() {
        fs.writeFileSync('test-data/this-checker.js', 'module.exports = {};');
        var database = {
            worlds: [
                {
                    levels: [
                        {
                            title: 'this great level',
                            checker: '../../../../test-data/this-checker.js'
                        }
                    ]
                }
            ]
        };
        try {
            checkThatCheckersExposeAnValidateMethod(database);
        }
        catch (error) {
            expect(error).toEqual('Checker ../../../../test-data/this-checker.js of level "this great level" should have an validate() method');
        }
    });
    
});

describe('Production Levels:', function() {
	
	var database;
	
	beforeEach(function() {
		database = new ProductionDatabase();
	});

    describe('Ids:', function() {
	
        it('All challenges must have an id', function() {
			array.forEach(database.worlds, function(world) {
				array.forEach(world.levels, function(level) {
					expect(level.id).toBeDefined();
				});
			});
        });
	
		it('must be unique', function() {
			var ids = [];
			array.forEach(database.worlds, function(world) {
				array.forEach(world.levels, function(level) {
					ids.push(level.id);
				});
			});
			array.forEach(ids, function(id) {
				var count = 0;
				for(var index=0; index<ids.length; index++) {
					if (ids[index] == id) {
						count = count + 1;
					}
				}
				expect(count).toEqual(1);
			});
		});
    });
    
    describe('Titles:', function() {
	
        it('All challenges must have a title', function() {
			array.forEach(database.worlds, function(world) {
				array.forEach(world.levels, function(level) {
					expect(level.title).toBeDefined();
				});
			});
        });
    });
    
    describe('Files:', function() {
	
        it('All challenges must have a file', function() {
            checkThatAllLevelFilesExist(database);
        });
    });
    
    describe('Requesters:', function() {
	
        it('All requesters can be required from feature.try/lib', function() {
            checkThatRequestersAreReachable(database);
        });

        it('All requesters expose an url() api', function() {
            checkThatRequestersExposeAnUrlMethod(database);
        });
    });
    
    describe('Checkers:', function() {
    
        it('All checkers can be required from feature.try/lib', function() {
            checkThatCheckersAreReachable(database);
        });

        it('All checkers expose an validate() api', function() {
            checkThatCheckersExposeAnValidateMethod(database);
        });
    });

    describe('IsOpenLevel functions', function() {
        
        it('All challenges must have a function isOpenLevelFor', function() {
			array.forEach(database.worlds, function(world) {
				array.forEach(world.levels, function(level) {
					expect(level.isOpenLevelFor).toBeDefined();
				});
			});
        });
    });
	
});