var restify = require('restify');
var bunyan = require('bunyan');
var log = bunyan.createLogger({
    name: "throttle",
    src: true,
    stream: process.stdout
});

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}

var server = restify.createServer({
    log: log,
    body: true,
    version: "1.0.0"
});

server.use(restify.throttle({
    burst: 2,
    rate: 1,
    ip: true
})); 

server.use(restify.conditionalRequest());

server.use(restify.requestLogger());

server.on('after', restify.auditLogger({
    log: log
}));

server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});