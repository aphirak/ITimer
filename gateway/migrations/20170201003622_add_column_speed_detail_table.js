
exports.up = function(knex, Promise) {  
  return Promise.all([
    knex.schema.table('details', function(table){
      table.decimal('speed', null, 3).after('time').notNullable();
    })
  ])
};

exports.down = function(knex, Promise) {  
  return Promise.all([
    knex.schema.table('details', function(table){
      table.dropColumn('speed');
    })
  ])
};