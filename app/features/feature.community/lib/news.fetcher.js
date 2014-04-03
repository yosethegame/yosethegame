function NewsFetcher() {}

NewsFetcher.prototype.getNews = function() {
    return [
	    {
	        date: '26 Feb',
	        image: 'me',
	        url: 'my-url',
	        text: 'my-news'
	    },
	    {
	        date: '1 Jan',
	        image: 'you',
	        url: 'your-url',
	        text: 'your-news'
	    },
	];
};

var module = module || {};
module.exports = NewsFetcher;