var PSql = require('../app/lib/psql.database');
var pg = require('pg');

describe('News service', function() {

	var url = process.env.DATABASE_URL;
	var database = new PSql(url);
	var client;
	
    beforeEach(function(done) {
		client = new pg.Client(url);
		client.connect(function(err) {
			client.query('drop table news', function(err, result) {
				client.query('create table news(date timestamp with time zone, json varchar(5000))', function(err, result) {
					client.end();
					expect(err).toEqual(null);
					done();
				});			
			});			
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