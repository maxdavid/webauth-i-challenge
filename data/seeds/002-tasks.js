exports.seed = function(knex) {
  return knex('tasks')
    .del()
    .then(function() {
      return knex('tasks').insert([
        {
          id: 1,
          project_id: 1,
          description: 'Destroy Bitcoin',
          notes: 'Satoshi will not stop in my way this time',
          completed: false
        },
        {
          id: 2,
          project_id: 1,
          description: 'Crash the Dow Jones',
          notes: 'The markets will crumble at my feet',
          completed: true
        },
        {
          id: 3,
          project_id: 2,
          description: 'Start smoking cigarettes',
          notes: 'It will make me look very cool',
          completed: false
        },
        {
          id: 4,
          project_id: 2,
          description: 'Learn some good pickup lines',
          notes: 'Ladies will love me',
          completed: false
        },
        {
          id: 5,
          project_id: 3,
          description: 'Practice my headshots',
          notes: '*pop pop*',
          completed: false
        },
        {
          id: 6,
          project_id: 3,
          description: 'Consider cheating',
          notes: 'I will think on this',
          completed: false
        }
      ]);
    });
};
