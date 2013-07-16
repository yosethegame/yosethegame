var mongodb = require('mongodb');
var url = require('url');

describe("MongoHq access", function() {

	var MONGOHQ_URL="mongodb://yose:yose@dharma.mongohq.com:10038/yose";
	var log = console.log;

	it("can connect to the prod db", function() {
		mongodb.Db.connect(MONGOHQ_URL, function(error, client) {
			expect(error).toBe(null);
			client.close();
		});
	});
	
	describe("players collection", function() {
		
		it("has at least one player", function(done) {
			mongodb.Db.connect(MONGOHQ_URL, function(error, client) {
				var collection = new mongodb.Collection(client, 'players');
				var documents = collection.find({}, {limit:1});
				documents.count(function(error, count){
					expect(count).toEqual(1);
					client.close();
					done();
				});
			});
		});

		it("has at least player ericminio", function(done) {
			mongodb.Db.connect(MONGOHQ_URL, function(error, client) {
				var collection = new mongodb.Collection(client, 'players');
				var documents = collection.find({ login: 'ericminio' });
				documents.count(function(error, count){
					expect(count).toEqual(1);
					client.close();
					done();
			    });
			});
		});
	});
	
});