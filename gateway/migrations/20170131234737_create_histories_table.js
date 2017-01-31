
exports.up = function(knex, Promise) {  
  return Promise.all([
    knex.schema.createTable('histories', function(table){
      table.increments().primary()
      table.string('user_id').notNullable()
      table.decimal('total_gate', null, 3).notNullable()
      table.decimal('total_distance', null, 3).notNullable()
      table.decimal('total_time', null, 3).notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  ])
};

exports.down = function(knex, Promise) {  
  return Promise.all([
    knex.schema.dropTable('histories')
  ])
};