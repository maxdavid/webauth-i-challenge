exports.seed = function(knex) {
  return knex('resources')
    .del()
    .then(function() {
      return knex('resources').insert([
        {
          id: 1,
          name: 'Xbox',
          description: 'Yknow, for games'
        },
        {
          id: 2,
          name: 'Supercomputer',
          description: 'Useful for calculating huge numbers. Also maybe games'
        },
        {
          id: 3,
          name: 'Cigarettes',
          description: 'Not good for health, but look cool'
        },
        {
          id: 4,
          name: 'Cool hat',
          description: 'Love this hat'
        },
        {
          id: 5,
          name: 'Knife',
          description: 'You never know when you might need to defend yourself'
        },
        {
          id: 6,
          name: 'Gold bars',
          description: 'Always valuable!'
        },
        {
          id: 7,
          name: 'Cactus',
          description: 'Best friend'
        },
        {
          id: 8,
          name: 'Coffee',
          description: 'Essential fuel'
        }
      ]);
    });
};
