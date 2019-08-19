const db = require('../../data/dbConfig');

module.exports = {
  find,
  findById,
  add,
  findTasks,
  findResources,
  update,
  remove,
  addTask
};

/**
 * find()
 *
 * Calling find returns a promise that resolves to an array of all projects in the database.
 * No tasks are included.
 */
async function find() {
  return await db('projects');
}

/**
 * findById(id)
 *
 * Expects a project id as its only parameter.
 * Resolve to a single project object.
 * On an invalid id, resolves to null.
 * @param {number} id
 */
async function findById(id) {
  project =
    (await db('projects')
      .where({ id })
      .first()) || null;
  return {
    ...project,
    tasks: await db('tasks')
      .where('project_id', id)
      .select(
        'tasks.id',
        'tasks.description',
        'tasks.notes',
        'tasks.completed'
      ),
    resources: await db('resources_for_project')
      .where('project_id', id)
      .join('resources', 'resources_for_project.resource_id', 'resources.id')
      .select('resources.id', 'resources.name', 'resources.description')
  };
}

/**
 * findTasks(id)
 *
 * Expects a project id.
 * Resolves to an array of all correctly ordered task for the given project:
 * [
 *   { id: 17, project_name: 'Find the Holy Grail', task_number: 1, instructions: 'quest'},
 *   { id: 18, project_name: 'Find the Holy Grail', task_number: 2, instructions: '...and quest'},
 *   etc.
 * ]
 * This array should include the project_name not the project_id.
 * @param {number} id
 */
async function findTasks(id) {
  // SELECT s.id, s.project_name, st.task_number, st.instructions FROM
  // projects AS s INNER JOIN tasks AS st ON s.id = st.project_id
  return await db('projects')
    .join('tasks', { 'tasks.project_id': 'projects.id' })
    .select('tasks.id', 'tasks.description', 'tasks.notes')
    .where('projects.id', id);
}

/**
 * findResources(id)
 *
 * Expects a project id.
 * Resolves to an array of all resources for the given project.
 * @param {number} id
 */
async function findResources(id) {
  // SELECT s.id, s.project_name, st.resource_number, st.instructions FROM
  // projects AS s INNER JOIN resources AS st ON s.id = st.project_id
  console.log(id);
  return await db('resources_for_project')
    .join('resources', {
      'resources_for_project.resource_id': 'resources.id'
    })
    .select('resources.id', 'resources.name', 'resources.description')
    .where('resources_for_project.project_id', id);
}

/**
 * add(project)
 *
 * Expects a project object.
 * Inserts project into the database.
 * Resolves to the newly inserted project, including id.
 * @param {object} project
 */
async function add(project) {
  const id = await db('projects').insert(project, 'id');
  return findById(...id);
}

/**
 * update(changes, id)
 *
 * Expects a changes object and an id.
 * Updates the project with the given id.
 * Resolves to the newly updated project object.
 * @param {object} changes
 * @param {number} id
 */
async function update(changes, id) {
  await db('projects')
    .where({ id })
    .update(changes);
  return findById(id);
}

/**
 * remove(id)
 *
 * Removes the project object with the provided id.
 * Resolves to the removed project
 * Resolves to null on an invalid id.
 * @param {number} id
 */
async function remove(id) {
  const delProject = await findById(id);
  const del_ = await db('projects')
    .where({ id })
    .del();
  return del_ ? delProject : null;
}

/**
 * addTask(task, project_id)
 *
 * This method expects a task object and a project id.
 * It inserts the new task into the database, correctly linking it to the intended project.
 * @param {object} task
 * @param {number} project_id
 */
async function addTask(task, project_id) {
  await db('tasks').insert({ ...task, project_id }, 'id');
  return await findTasks(project_id);
}
