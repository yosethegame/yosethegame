var $ = require('jquery')(require("jsdom").jsdom().parentWindow);
require('./lib/news.renderer');

describe('News Renderer', function() {

    beforeEach(function() {
        var template = '<li id="news-x">' +
                            '<span class="any class before the specific news-date"></span>' +
                            '<span class="any class before the specific news-content"></span>' +
                            '<a href=""><img src=""/></a>' +
                       '</li>';
        $('body').append('<ul id="news-list">' + template + '</ul>');
    });
    
    afterEach(function() {
        $('#news-list').remove();
    });

    it('displays as much line as there are news', function() {
        var renderer = new NewsRenderer($);
        renderer.display([
                { date: '26 Feb', image: 'me', url: 'my-url', text: 'my-news'},
                { date: '26 Feb', image: 'me', url: 'my-url', text: 'my-news'},
            ]);
        expect($('ul#news-list li').length).toEqual(2);
    });
    
    describe('news line', function() {
        
        beforeEach(function() {
            var renderer = new NewsRenderer($);
            renderer.display([
                    { date: '26 Feb', image: 'me', url: 'my-url', text: 'my-news'}
                ]);
        });
        
        it('has an id', function() {
            expect($('ul#news-list li:nth-child(1)').attr('id')).toEqual('news-1');
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

    describe('date rendering', function() {
        
        var renderer;
        
        beforeEach(function() {
            renderer = new NewsRenderer($);
        });
        
        it('renders news of the day in hours', function() {                
            renderer.getCurrentTime = function() { 
                return Date.parse('Tue Apr 15 2014 21:00:00 GMT-0400 (EDT)');
            };
            renderer.display([ { date: '2014-04-15T23:00:00.000Z', image: 'me', url: 'my-url', text: 'my-news'} ]);
                            
            expect($('ul#news-list li:nth-child(1) .news-date').text()).toEqual('2 h ago');
        });

        it('renders news of the minute in seconds', function() {                
            renderer.getCurrentTime = function() { 
                return Date.parse('Tue Apr 15 2014 10:00:00 GMT-0400 (EDT)');
            };
                            
            expect(renderer.formatDate('Tue Apr 15 2014 09:59:50 GMT-0400 (EDT)')).toEqual('10 s ago');
        });

        it('renders news of the hour in minutes', function() {                
            renderer.getCurrentTime = function() { 
                return Date.parse('Tue Apr 15 2014 10:00:00 GMT-0400 (EDT)');
            };
                            
            expect(renderer.formatDate('Tue Apr 15 2014 09:45:00 GMT-0400 (EDT)')).toEqual('15 min ago');
        });

        it('renders news of the week in days', function() {                
            renderer.getCurrentTime = function() { 
                return Date.parse('Tue Apr 15 2014 10:00:00 GMT-0400 (EDT)');
            };
                            
            expect(renderer.formatDate('Tue Apr 12 2014 10:00:00 GMT-0400 (EDT)')).toEqual('3 days ago');
        });

        it('renders news of yesterday as yesterday', function() {                
            renderer.getCurrentTime = function() { 
                return Date.parse('Tue Apr 15 2014 10:00:00 GMT-0400 (EDT)');
            };
                            
            expect(renderer.formatDate('Tue Apr 14 2014 9:00:00 GMT-0400 (EDT)')).toEqual('yesterday');
        });

        it('renders older news with the actual date', function() {                
            renderer.getCurrentTime = function() { 
                return Date.parse('Tue Apr 15 2014 10:00:00 GMT-0400 (EDT)');
            };
                            
            expect(renderer.formatDate('Tue Apr 07 2014 10:00:00 GMT-0400 (EDT)')).toEqual('Apr 7');
        });

    });

});