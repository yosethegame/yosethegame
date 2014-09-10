module.exports = function(request, response, database) {
    response.setHeader('Content-Type', 'application/json');

    response.write(JSON.stringify({}));
    response.end();
};