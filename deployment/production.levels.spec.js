var ProductionDatabase = require('../public/js/productionDatabase');
var FileDatabase = require('../public/js/fileDatabase');
var fs = require('fs');
var array = require('../public/js/utils/array.utils');

describe('Production Levels:', function() {
	
	it('inherits from fileDatabase targeting player folder', function() {
		expect(ProductionDatabase.prototype).toEqual(new FileDatabase('players'));
	});
	
	it('does not override target folder', function() {
		expect(new ProductionDatabase().folder).toEqual('players');
	});
	
	var database;
	
	beforeEach(function() {
		database = new ProductionDatabase();
	});

    describe('Titles:', function() {
	
        it('All challenges must have a title', function() {
			array.forEach(database.levels, function(level) {
		       	array.forEach(level.challenges, function(challenge) {
					expect(challenge.title).toBeDefined();
	    	    });
			});
	    });
    });
    
    describe('Files:', function() {
	
        it('All challenges must have a file', function() {
			array.forEach(database.levels, function(level) {
		       	array.forEach(level.challenges, function(challenge) {
					if (!fs.existsSync(challenge.file)) {
						throw 'File "' + challenge.file + '" of challenge "' + challenge.title + '" not found';
					}
				});
    	    });
	    });
    });
    
    describe('Requesters:', function() {
	
        it('All requesters can be required from public/js and provide an url() api', function() {
			array.forEach(database.levels, function(level) {
		       	array.forEach(level.challenges, function(challenge) {
        			var Requester = require('../public/js/' + challenge.requester);
                	var requester = new Requester();
                	if (requester.url == undefined) {
                		throw 'Requester ' + challenge.requester + ' of challenge "' + challenge.title + '" should have an url() method';
                	}
				});
    	    });
	    });
    });
    
    describe('Checkers:', function() {
    
	    it('All checkers can be required from public/js and provide a validate api', function() {
			array.forEach(database.levels, function(level) {
		       	array.forEach(level.challenges, function(challenge) {
        			var checker = require('../public/js/' + challenge.checker);
                	if (checker.validate == undefined) {
                		throw 'Checker ' + challenge.checker + ' of challenge "' + challenge.title + '" should have a validate() method';
                	}
				});
    	    });
        });
    });
    
	
});