const express = require('express');
const router = express.Router();

const { restricted } = require('../middleware');
const Projects = require('./projectsModel.js');

router.use('/', restricted);

router.get('/', async (req, res) => {
  try {
    const projects = await Projects.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get projects' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Projects.findById(id);

    if (project) {
      res.json(project);
    } else {
      res
        .status(404)
        .json({ message: 'Could not find project with given id.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get projects' });
  }
});

router.get('/:id/tasks', async (req, res) => {
  const { id } = req.params;

  try {
    const tasks = await Projects.findTasks(id);

    if (tasks.length) {
      res.json(tasks);
    } else {
      res
        .status(404)
        .json({ message: 'Could not find tasks for given project' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get tasks' });
  }
});

router.get('/:id/resources', async (req, res) => {
  const { id } = req.params;

  try {
    const resources = await Projects.findResources(id);

    if (resources.length) {
      res.json(resources);
    } else {
      res
        .status(404)
        .json({ message: 'Could not find resources for given project' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get resources' });
  }
});

router.post('/', async (req, res) => {
  const projectData = req.body;

  try {
    const project = await Projects.add(projectData);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new project' });
  }
});

router.post('/:id/tasks', async (req, res) => {
  const taskData = req.body;
  const { id } = req.params;

  try {
    const project = await Projects.findById(id);

    if (project) {
      const task = await Projects.addTask(taskData, id);
      res.status(201).json(task);
    } else {
      res
        .status(404)
        .json({ message: 'Could not find project with given id.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new task' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const project = await Projects.findById(id);

    if (project) {
      const updatedProject = await Projects.update(changes, id);
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update project' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Projects.remove(id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete project' });
  }
});

module.exports = router;
