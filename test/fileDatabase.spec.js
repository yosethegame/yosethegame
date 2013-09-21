var fs = require('fs');
var FileDatabase = require('../public/js/fileDatabase');

describe('File Database', function() {

	var database;
	var folder = 'test/data';
	var annessou = { 
		login: 'asm',
		name: 'annessou'
	};
	
	beforeEach(function() {
		database = new FileDatabase('test/data');
	});
	
	it('can be instantiated', function() {
		expect(database).toNotBe(undefined);
	});
	
	it('reminds the given working folder', function() {
		expect(database.folder).toEqual('test/data');
	});
	
	describe('Finding players', function() {
	
		beforeEach(function() {
			fs.writeFileSync(folder + '/player.asm', JSON.stringify(annessou));
		});

		it('can find a player that exists', function(done) {
			database.find('asm', function(player) {
				expect(player.name).toEqual('annessou');
				done();
			});
		});
		
		it('returns undefined when not found', function(done) {
			database.find('not-here', function(player) {
				expect(player).toBe(undefined);
				done();
			});
		});
	});
	
	describe('Creating players', function() {
	
		beforeEach(function() {
			fs.unlinkSync(folder + '/player.asm')
		})
	
		it('can create a new player', function(done) {
			database.createPlayer(annessou, function() {
				database.find('asm', function(player) {
					expect(player.name).toEqual('annessou');
					done();
				});
			});			
		});
		
		it('preserves an already existing player', function(done) {
			database.createPlayer(annessou, function() {
				annessou.name = 'new name';
				database.createPlayer(annessou, function() {
					database.find('asm', function(player) {
						expect(player.name).toEqual('annessou');
						done();
					});
				});	
			});
		});
		
	});
	
	describe('Updating player', function() {
		
		beforeEach(function(done) {
			fs.unlinkSync(folder + '/player.asm')
			database.createPlayer(annessou, function() {
				done();
			});
		})
	
		it('can modify a player', function(done) {
			annessou.field = 'anything';
			database.savePlayer(annessou, function() {
				database.find('asm', function(player) {
					expect(player.field).toEqual('anything');
					done();
				});
			});			
		});		
	});
});