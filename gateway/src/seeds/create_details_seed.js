
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('details').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('details').insert({id: 1, history_id: '1', phase: 1, distance: 10, time: 5.5, speed: 1.818}),
        knex('details').insert({id: 2, history_id: '1', phase: 2, distance: 20, time: 3.5, speed: 5.714}),
        knex('details').insert({id: 3, history_id: '2', phase: 1, distance: 2, time: 10, speed: 0.2}),
        knex('details').insert({id: 4, history_id: '2', phase: 2, distance: 1, time: 3, speed: 0.333}),
        knex('details').insert({id: 5, history_id: '2', phase: 3, distance: 5, time: 1, speed: 5}),
      ]);
    });
};
