const Router = require('router');
const querystring = require('querystring');
const parseurl = require('parseurl');
const { expand, parse } = require('postal-async');

module.exports = api;

function parseQuery(req, res, next) {
  const { query } = parseurl(req);
  req.address = querystring.parse(query).address;
  if (req.address) {
    next();
  } else {
    next(400); // missing required parameter
  }
}

function libpostal(req, res, next) {
  const { timings } = res.locals;
  const { address, operation } = req;

  timings.start('libpostal');

  operation(address, function (err, item) {
    req.item = item;
    timings.end('libpostal');
    next(err);
  });
}

function setExpand(req, res, next) {
  req.operation = expand;
  next();
}

function setParse(req, res, next) {
  req.operation = parse;
  next();
}

function cacheControl(req, res, next) {
  // good for a week
  res.setHeader('Cache-Control', 'public, max-age=604800');
  next();
}

function send(req, res) {
  const data = Buffer.from(JSON.stringify(req.item));
  const len = data.byteLength;

  // normal response
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Content-Length', len);
  return res.end(data);
}

function api() {
  const router = new Router({
    strict: true,
    caseSensitive: true
  });

  router.get('/expand', parseQuery, setExpand, libpostal, cacheControl, send);
  router.get('/parse', parseQuery, setParse, libpostal, cacheControl, send);

  return router;
}
