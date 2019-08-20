const db = require('../../data/dbConfig');

module.exports = {
  find,
  findById,
  add,
  findProjects,
  update,
  remove,
  addProject,
  findTaskContexts
};

/**
 * find()
 *
 * Calling find returns a promise that resolves to an array of all tasks in the database.
 * No projects are included.
 */
async function find() {
  return await db('tasks');
}

/**
 * findById(id)
 *
 * Expects a task id as its only parameter.
 * Resolve to a single task object.
 * On an invalid id, resolves to null.
 * @param {number} id
 */
async function findById(id) {
  return (
    (await db('tasks')
      .where({ id })
      .first()) || null
  );
}

async function findTaskContexts(id) {
  return await db('tasks_for_context')
    .where('task_id', id)
    .join('contexts', 'tasks_for_context.context_id', 'contexts.id')
    .select('contexts.id', 'contexts.name');
}

/**
 * findProjects(id)
 *
 * Expects a task id.
 * Resolves to an array of all correctly ordered project for the given task:
 * [
 *   { id: 17, task_name: 'Find the Holy Grail', project_number: 1, instructions: 'quest'},
 *   { id: 18, task_name: 'Find the Holy Grail', project_number: 2, instructions: '...and quest'},
 *   etc.
 * ]
 * This array should include the task_name not the task_id.
 * @param {number} id
 */
async function findProjects(id) {
  // SELECT s.id, s.task_name, st.project_number, st.instructions FROM
  // tasks AS s INNER JOIN projects AS st ON s.id = st.task_id
  return await db('tasks')
    .join('projects', { 'projects.id': 'tasks.project_id' })
    .select('projects.id', 'projects.description')
    .where('tasks.id', id);
}

/**
 * add(task)
 *
 * Expects a task object.
 * Inserts task into the database.
 * Resolves to the newly inserted task, including id.
 * @param {object} task
 */
async function add(task) {
  const id = await db('tasks').insert(task, 'id');
  return findById(...id);
}

/**
 * update(changes, id)
 *
 * Expects a changes object and an id.
 * Updates the task with the given id.
 * Resolves to the newly updated task object.
 * @param {object} changes
 * @param {number} id
 */
async function update(changes, id) {
  await db('tasks')
    .where({ id })
    .update(changes);
  return findById(id);
}

/**
 * remove(id)
 *
 * Removes the task object with the provided id.
 * Resolves to the removed task
 * Resolves to null on an invalid id.
 * @param {number} id
 */
async function remove(id) {
  const delTask = await findById(id);
  const del_ = await db('tasks')
    .where({ id })
    .del();
  return del_ ? delTask : null;
}

/**
 * addProject(project, task_id)
 *
 * This method expects a project object and a task id.
 * It inserts the new project into the database, correctly linking it to the intended task.
 * @param {object} project
 * @param {number} task_id
 */
async function addProject(project, task_id) {
  await db('projects').insert({ ...project, task_id }, 'id');
  return await findProjects(task_id);
}
