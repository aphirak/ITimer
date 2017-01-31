
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('histories').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('histories').insert({id: 1, user_id: '1', total_gate: 3, total_distance: 30, total_time: 9, speed_average: 3.333 }),
        knex('histories').insert({id: 2, user_id: '2', total_gate: 4, total_distance: 8, total_time: 14, speed_average: 0.571 })
      ]);
    });
};
