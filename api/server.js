const express = require('express');
const server = express();

const projectsRouter = require('./projects/projectsRouter');
const tasksRouter = require('./tasks/tasksRouter');
const authRouter = require('./auth/authRouter');
const usersRouter = require('./users/usersRouter');

server.use(express.json());

const logger = (req, res, next) => {
  console.log(`${req.method} request made to ${req.url} at ${Date.now()}`);
  next();
};

server.use(logger);

server.get('/', (req, res) => {
  res.status(200).json('nice');
});

server.use('/api/projects', projectsRouter);
server.use('/api/tasks', tasksRouter);
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

module.exports = server;
