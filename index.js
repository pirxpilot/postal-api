require('dotenv').config({ path: '/etc/default/postal-api' });

const connect = require('@pirxpilot/connect');
const timings = require('server-timings');

const POSTAL_API_PORT = process.env.POSTAL_API_PORT || 4030;

const app = connect();

app.use(function (req, res, next) {
  res.locals = {};
  next();
});
app.use(timings);

const api = require('./lib/api')();
app.use('/', api);

module.exports = app;

if (!module.parent) {
  const { createServer } = require('http');
  createServer(app).listen(POSTAL_API_PORT);
  console.log('Listening on port', POSTAL_API_PORT);
}
