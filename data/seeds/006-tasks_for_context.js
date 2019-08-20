exports.seed = function(knex) {
  return knex('tasks_for_context')
    .del()
    .then(function() {
      return knex('tasks_for_context').insert([
        { id: 1, task_id: 1, context_id: 3 },
        { id: 2, task_id: 2, context_id: 3 },
        { id: 3, task_id: 3, context_id: 4 },
        { id: 4, task_id: 4, context_id: 3 },
        { id: 5, task_id: 5, context_id: 5 },
        { id: 6, task_id: 6, context_id: 5 }
      ]);
    });
};
