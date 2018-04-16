const User = require('../models/User');
const passport = require('../modules/passport');

module.exports = app => {
  app.get('/isauth', (req, res) => {
    if ( req.user ) 
      res.send({user: req.user})
    else res.send({message: 'Not logged in'});
  });

  app.post('/login', (req, res) => {
    passport.authenticate('local')(req, res, result => {
      res.send({user: req.user, message: 'Worked!'});
    });
  })
}