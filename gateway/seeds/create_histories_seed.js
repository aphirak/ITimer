
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('histories').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('histories').insert({id: 1, user_id: '1', total_gate: 3, total_distance: 10, total_time: 10.2, speed_average: 0.98 }),
        knex('histories').insert({id: 2, user_id: '2', total_gate: 4, total_distance: 8, total_time: 14, speed_average: 0.571 }),
        knex('histories').insert({id: 3, user_id: '1', total_gate: 2, total_distance: 8, total_time: 13, speed_average: 0.615 }),
        knex('histories').insert({id: 4, user_id: '1', total_gate: 4, total_distance: 15, total_time: 20, speed_average: 0.75 }),
        knex('histories').insert({id: 5, user_id: '1', total_gate: 2, total_distance: 10, total_time: 12, speed_average: 0.833 }),
        knex('histories').insert({id: 6, user_id: '1', total_gate: 3, total_distance: 14, total_time: 12, speed_average: 1.167 }),
        knex('histories').insert({id: 7, user_id: '1', total_gate: 2, total_distance: 10, total_time: 12, speed_average: 0.833 })
      ]);
    });
};
