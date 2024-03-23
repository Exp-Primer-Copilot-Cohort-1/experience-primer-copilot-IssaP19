// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var querystring = require('querystring');
var comments = [];

var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname == '/') {
        fs.readFile('./comment.html', function (err, data) {
            if (err) {
                console.log(err);
                res.end('Error');
            } else {
                res.end(data);
            }
        });
    } else if (pathname == '/addComment') {
        var comment = urlObj.query;
        comments.push(comment);
        res.end(JSON.stringify(comments));
    } else {
        fs.readFile('.' + pathname, function (err, data) {
            if (err) {
                console.log(err);
                res.end('Error');
            } else {
                res.end(data);
            }
        });
    }
}).listen(8080, function () {
    console.log('Server running at http:');
}
);