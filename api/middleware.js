const bcrypt = require('bcryptjs');
const usersModel = require('./users/usersModel');

module.exports = {
  restricted
};

function restricted(req, res, next) {
  const { username, password } = req.headers;
  if (username && password) {
    usersModel.findByUsername(username).then(user => {
      if (user && bcrypt.compareSync(password, user.password)) next();
      else res.status(401).json({ message: 'Invalid creds' });
    });
  } else {
    res
      .status(400)
      .json({ message: 'Please send a username and password in the headers' });
  }
}
