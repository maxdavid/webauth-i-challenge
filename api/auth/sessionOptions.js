require('dotenv').config();

module.exports = session => {
  const KnexSessionStore = require('connect-session-knex')(session);
  const knexConnection = require('../../data/dbConfig');

  return {
    name: 'session_cookie',
    secret: process.env.COOKIE_SECRET || 'lolwat',
    cookie: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
      maxAge: 1000 * 24 * 60 * 60, // a dayish ago
      httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
      knex: knexConnection,
      createTable: true,
      clearInterval: 1000 * 60 * 60
    })
  };
};
