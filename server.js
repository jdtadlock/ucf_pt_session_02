const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000;
const api_routes = require('./routes/api_routes');
const passport_routes = require('./routes/passport_routes');
const session = require('express-session');
const passport = require('./modules/passport');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ucf_passport');

mongoose.Promise = Promise;

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'fWUl3xGPQHmHWsv1YGy1bWvgw1v1fTxo',
  proxy: true,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


passport_routes(app);
api_routes(app);

// Catch every other route except our API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on ${port}`));