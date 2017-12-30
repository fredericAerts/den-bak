const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const _ = require('lodash');

// const env = process.env.NODE_ENV || 'development';
const app = express();
//  Development
const port = process.env.PORT || 5000;
//  Production
// const port = process.env.PORT || 8000;

/*  Database
    ======================================================== */
const db = mongoose.connect('mongodb://localhost/de-ster');

db.connection.on('error', () => {
  // eslint-disable-next-line no-console
  console.error('db connection error...');
});
db.connection.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('db opened');
});

/*  Views config
    ======================================================== */
app.set('views', './server/views');
app.set('view engine', 'ejs');

/*  Parsing
    ======================================================== */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*  Routing & Authentication
    ================================================== */
app.use(express.static('./public'));
app.use('/', require('./server/routes/routes')());

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

/*  Listen
    ======================================================== */
app.listen(port);
// eslint-disable-next-line no-console
console.log(`Listening on port ${port} ...`);

module.exports = app;
