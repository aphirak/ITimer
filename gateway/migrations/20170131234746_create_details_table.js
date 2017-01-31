
exports.up = function(knex, Promise) {  
  return Promise.all([
    knex.schema.createTable('details', function(table){
      table.increments().primary()
      table.string('history_id').notNullable()
      table.integer('phase', null, 3).notNullable()
      table.decimal('distance', null, 3).notNullable()
      table.decimal('time', null, 3).notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  ])
};

exports.down = function(knex, Promise) {  
  return Promise.all([
    knex.schema.dropTable('details')
  ])
};