exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();
      tbl
        .string('name', 127)
        .unique()
        .notNullable();
      tbl.string('description', 255);
      tbl.boolean('completed');
    })
    .createTable('tasks', tbl => {
      tbl.increments();
      tbl
        .string('description', 255)
        .unique()
        .notNullable();
      tbl.string('notes', 255);
      tbl.boolean('completed');
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('resources', tbl => {
      tbl.increments();
      tbl
        .string('name', 127)
        .notNullable()
        .unique();
      tbl.string('description', 255);
    })
    .createTable('resources_for_project', tbl => {
      tbl.increments();
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('resource_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('resources')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('resources_for_project')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects');
};
