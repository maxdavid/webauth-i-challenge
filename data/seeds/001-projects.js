exports.seed = function(knex) {
  return knex('projects')
    .del()
    .then(function() {
      return knex('projects').insert([
        {
          id: 1,
          name: 'World Domination',
          completed: false,
          description: 'Conquer the world for myself'
        },
        {
          id: 2,
          name: 'Get Cooler',
          completed: false,
          description: 'Unfortunately, not very cool. Need to get cooler'
        },
        {
          id: 3,
          name: 'Beat Halo 3 on Legendary',
          completed: false,
          description:
            'Been working on this for 12 years. This is the year I do it I swear'
        }
      ]);
    });
};
