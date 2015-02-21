var newsendpoint = require('./lib/news.request');

describe('News endpoint', function() {
   
    var news;
    var received;
    var response = { 
        write: function(value) { received = value; }, 
        end: function() {},
        writeHead: function(code, headers) { this.code = code; this.headers = headers; }
    };

	beforeEach(function() {	
        news = { any: 'value' };
        var database = { getNews: function(callback) { callback(news); } };
        newsendpoint({}, response, database);
	});

    it('sends the news', function() {
        expect(received).toEqual(JSON.stringify(news));
    });
    
    it('sends the news as text/plain', function() {
        expect(response.headers['content-type']).toEqual('text/plain');
    });
});