var fs = require('fs');
var FileDatabase = require('../public/js/FileDatabase');

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

		it('can find a player that exists', function() {
			expect(database.find('asm').name).toEqual('annessou');
		});
		
		it('returns undefined when not found', function() {
			expect(database.find('not-here')).toBe(undefined);
		});
	});
	
	describe('Creating players', function() {
	
		beforeEach(function() {
			fs.unlinkSync(folder + '/player.asm')
		})
	
		it('can create a new player', function() {
			database.createPlayer(annessou);
			
			expect(database.find('asm').name).toEqual('annessou');
		});
		
		it('preserves an already existing player', function() {
			database.createPlayer(annessou);
			annessou.name = 'new name';
			database.createPlayer(annessou);

			expect(database.find('asm').name).toEqual('annessou');
		});
		
	});
});