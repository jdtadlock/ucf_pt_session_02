const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new Strategy({
  usernameField: 'email'
}, (email, password, cb) => {
  User.findOne({email: email})
    .then(user => {
      if ( !user ) return cb(null, false);

      if ( user.password != password ) 
        return cb(null, false);
      
      // Store the user to the session
      return cb(null, user);
    })
}));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id).then(user => {
    cb(null, user);
  })
});

module.exports = passport;