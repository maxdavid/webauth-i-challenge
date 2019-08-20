const express = require('express');
const router = express.Router();

const { restricted } = require('../middleware');
const Tasks = require('./tasksModel.js');

router.use('/', restricted);

router.get('/', async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get tasks' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Tasks.findById(id);

    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Could not find task with given id.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get tasks' });
  }
});

router.get('/:id/projects', async (req, res) => {
  const { id } = req.params;

  try {
    const projects = await Tasks.findProjects(id);

    if (projects.length) {
      res.json(projects);
    } else {
      res
        .status(404)
        .json({ message: 'Could not find projects for given task' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get projects' });
  }
});

router.get('/:id/contexts', async (req, res) => {
  const { id } = req.params;

  try {
    const contexts = await Tasks.findTaskContexts(id);

    if (contexts.length) {
      res.json(contexts);
    } else {
      res
        .status(404)
        .json({ message: 'Could not find contexts for given task' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get contexts' });
  }
});

router.post('/', async (req, res) => {
  const taskData = req.body;

  try {
    const task = await Tasks.add(taskData);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new task' });
  }
});

router.post('/:id/projects', async (req, res) => {
  const projectData = req.body;
  const { id } = req.params;

  try {
    const task = await Tasks.findById(id);

    if (task) {
      const project = await Tasks.addProject(projectData, id);
      res.status(201).json(project);
    } else {
      res.status(404).json({ message: 'Could not find task with given id.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new project' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const task = await Tasks.findById(id);

    if (task) {
      const updatedTask = await Tasks.update(changes, id);
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Could not find task with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Tasks.remove(id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find task with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

module.exports = router;
