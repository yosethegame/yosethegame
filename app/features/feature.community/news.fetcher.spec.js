var $ = require('jquery');
var NewsFetcher = require('./lib/news.fetcher');

describe('News fetcher', function() {
   
    var fetcher = new NewsFetcher();
   
    it('calls news endpoint', function() {
        spyOn($, 'get').andCallThrough();
        fetcher.getNews();
        
        expect($.get).toHaveBeenCalledWith('/getNews');
    });
});