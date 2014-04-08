var $ = require('jquery');
var NewsFetcher = require('./lib/news.fetcher');

describe('News fetcher', function() {
   
    var fetcher = new NewsFetcher();
   
    it('calls news endpoint', function() {
        spyOn($, 'get').andCallThrough();
        fetcher.getNews();
        
        expect($.get).toHaveBeenCalledWith('/news');
    });
    
    it('calls the received callback', function() {
        var news = { any: 'value' };
        spyOn($, 'get').andCallFake(function() {
            return {
                success: function(callback) {
                    callback(news);
                }
            };
        });
        spyOn(fetcher, 'received');
        fetcher.getNews();
        
        expect(fetcher.received).toHaveBeenCalledWith(news);
    });
    
    it('sends the received news to the renderer', function() {
        var renderer = { display: function(){} };
        spyOn(renderer, 'display');
        fetcher.useRenderer(renderer);
        var news = { any: 'value' };
        fetcher.received(JSON.stringify(news));
        
        expect(renderer.display).toHaveBeenCalledWith(news);
    });
});