const express = require('express');
const server = express();

const projectsRouter = require('./projects/projectsRouter');
const tasksRouter = require('./tasks/tasksRouter');

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

module.exports = server;
