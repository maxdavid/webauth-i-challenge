exports.up = function(knex) {
  return knex.schema
    .createTable('contexts', tbl => {
      tbl.increments();
      tbl
        .string('name', 127)
        .unique()
        .notNullable();
    })
    .createTable('tasks_for_context', tbl => {
      tbl.increments();
      tbl
        .integer('task_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tasks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('context_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('contexts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('tasks_for_contexts')
    .dropTableIfExists('contexts');
};
