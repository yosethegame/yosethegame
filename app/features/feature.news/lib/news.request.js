var newsEndpoint = function(request, response, database) {

    database.getNews(function(news) {
        response.writeHead(200, { 'content-type':'text/plain' });
        response.write(JSON.stringify(news));
        response.end();
    });	
};

module.exports = newsEndpoint;