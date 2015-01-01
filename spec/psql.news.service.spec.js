var PSql = require('../app/lib/psql.database');
var pg = require('pg');
var dropAndCreateTableNews = require('../app/utils/database.drop.and.create.table.news');

describe('News service', function() {

	var url = process.env.DATABASE_URL;
	var database = new PSql(url);
	var client;
	
    beforeEach(function(done) {
        dropAndCreateTableNews(url, function() {
            done();
        });
    });
	
	it('retrieves the news in the desc order', function(done) {
	    var news = [ { text: 'yesterday' }, { text: 'today' } ];
		database.addNews( news[0], function() {
    		database.addNews( news[1], function() {
        		database.getNews(function(received) {
        			expect(received[0].text).toEqual('today');
        			expect(received[1].text).toEqual('yesterday');
        			done();
        		});
    		});
		});
	});

	it('adds the current date to the given news', function(done) {
		database.addNews( { any: 'value' }, function() {
        	database.getNews(function(received) {
        		expect(received[0].date.toString()).toEqual(new Date().toString());
        		done();
        	});
		});
	});

});