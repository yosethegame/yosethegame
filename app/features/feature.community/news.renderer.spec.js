var $ = $ || require('jquery');
var NewsRenderer = require('./lib/news.renderer');

describe('News Renderer', function() {

    beforeEach(function() {
        var template = '<li id="news-x">' +
                            '<span class="news-date"></span>' +
                            '<span class="news-content"></span>' +
                            '<a href=""><img src=""/></a>' +
                       '</li>';
        $('body').append('<ul id="news-list">' + template + '</ul>');
    });
    
    afterEach(function() {
        $('#news-list').remove();
    });

    it('displays as much line as there are news', function() {
        var renderer = new NewsRenderer();
        renderer.display([
                { date: '26 Feb', image: 'me', url: 'my-url', text: 'my-news'},
                { date: '26 Feb', image: 'me', url: 'my-url', text: 'my-news'},
            ]);
        expect($('ul#news-list li').length).toEqual(2);
    });
    
    describe('news line', function() {
        
        beforeEach(function() {
            var renderer = new NewsRenderer();
            renderer.display([
                    { date: '26 Feb', image: 'me', url: 'my-url', text: 'my-news'}
                ]);
        });
        
        it('has an id', function() {
            expect($('ul#news-list li:nth-child(1)').attr('id')).toEqual('news-1');
        });

        it('displays the date', function() {
            expect($('ul#news-list li:nth-child(1) .news-date').text()).toEqual('26 Feb');
        });

        it('displays the content', function() {
            expect($('ul#news-list li:nth-child(1) .news-content').text()).toEqual('my-news');
        });
        
        it('links to the given url', function() {
            expect($('ul#news-list li:nth-child(1) a').attr('href')).toEqual('my-url');
        });

        it('uses the given image as the link', function() {
            expect($('ul#news-list li:nth-child(1) a img').attr('src')).toEqual('me');
        });
    });    
});