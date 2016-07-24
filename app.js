var restify = require('restify');
var bunyan = require('bunyan');
var log = bunyan.createLogger({
  name: "throttle",
  src: true
});
var count = 0;
function respond(req, res, next) {
  req.log.info("test");
  res.send('hello ' + req.params.name + count);
  res.log.info("response");
  next();
}

var server = restify.createServer({
  log: log
});

server.use(restify.throttle({
  burst: 2,
  rate: 1,
  ip: true
}));

server.use(restify.requestLogger())

server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});