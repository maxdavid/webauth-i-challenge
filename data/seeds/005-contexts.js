exports.seed = function(knex) {
  return knex('contexts')
    .del()
    .then(function() {
      return knex('contexts').insert([
        { id: 1, name: 'Home' },
        { id: 2, name: 'Work' },
        { id: 3, name: 'Online' },
        { id: 4, name: 'Around town' },
        { id: 5, name: 'Couch' }
      ]);
    });
};
