const User = require('../models/User');

// let user = new User({
//   email: 'jdtadlock@test.com',
//   password: 'password'
// });

// user.save();

// User.find({}).then(users => console.log(users));

module.exports = app => {
  app.get('/users', (req, res) => {
    console.log('fired');
    User.find({}).then(users => {
      res.send(users);
    })
  })
}