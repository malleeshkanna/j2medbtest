const http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    if(req.url=="/malleesh"){
        res.send("Welcome Malleesh");
    }
    res.end();

  }).listen(8080);
