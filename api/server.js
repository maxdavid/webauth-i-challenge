require('dotenv').config();
const express = require('express');
const server = express();
const helmet = require('helmet');

const projectsRouter = require('./projects/projectsRouter');
const tasksRouter = require('./tasks/tasksRouter');
const authRouter = require('./auth/authRouter');
const usersRouter = require('./users/usersRouter');

const session = require('express-session');
const sessionOptions = require('./auth/sessionOptions');

server.use(express.json());
server.use(helmet());
server.use(session(sessionOptions(session)));

const logger = (req, res, next) => {
  console.log(`${req.method} request made to ${req.url} at ${Date.now()}`);
  next();
};
server.use(logger);

server.use('/api/projects', projectsRouter);
server.use('/api/tasks', tasksRouter);
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.status(200).json('nice');
});

module.exports = server;
