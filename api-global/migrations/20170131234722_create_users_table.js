
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.integer('id')
      table.string('username').notNullable().unique()
      table.string('firstname')
      table.string('lastname')
      table.string('nickname')
      table.string('created_at')
    })
  ])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('users')
	])
};
