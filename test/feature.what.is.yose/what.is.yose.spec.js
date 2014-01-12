var feature = require('../../public/feature.what.is.yose/what.is.yose.request');
var cheerio = require('cheerio');

describe('What is yose', function() {
   
    var response = {
		write: function(content) { this.html = content; },
		end: function() {}
	};
	var page;
	
	beforeEach(function() {	
		feature( { url: '/what-is-yose' }, response, {} );
		page = cheerio.load(response.html);
	});
	
    it('contains the correct image', function() {
        expect(page('img').attr('src')).toEqual('/img/what-is-yose.png');
    });
   
});