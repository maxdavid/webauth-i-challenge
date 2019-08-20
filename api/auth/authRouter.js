const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const usersModel = require('../users/usersModel');

router.post(
  '/register',
  checkUserCreds,
  checkUserExists,
  async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const digest = bcrypt.hashSync(password, 12);
      await usersModel
        .add({
          username: username,
          password: digest
        })
        .then(
          newUser =>
            res.status(201).json({ id: newUser.id, username: newUser.username })
          // res.status(201).json(newUser);
        );
    } catch (err) {
      res.status(500).json({ message: 'Could not register user.', error: err });
    }
  }
);

router.post('/login', checkUserCreds, (req, res, next) => {
  const { username, password } = req.body;
  usersModel
    .findByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = username;
        res.status(200).json({ message: `Welcome ${username}!`, token: 'wat' });
      } else res.status(401).json({ message: 'Invalid creds' });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error logging in' });
    });
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.status(200).json({ message: 'goodbye' });
  });
});

// middleware

async function checkUserCreds(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password)
    res.status(400).json({ message: 'Send a username and password in body' });
  else next();
}

async function checkUserExists(req, res, next) {
  const { username } = req.body;
  try {
    const userInDb = await usersModel.findByUsername(username);
    if (userInDb && userInDb.username === username) {
      res.status(401).json({ message: 'Username already in use' });
    } else next();
  } catch (err) {
    res.status(500).json({ message: 'Error accessing users' });
  }
}

module.exports = router;
