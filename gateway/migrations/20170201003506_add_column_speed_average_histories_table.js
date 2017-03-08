
exports.up = function(knex, Promise) {  
  return Promise.all([
    knex.schema.table('histories', function(table){
      table.decimal('speed_average', null, 3).after('total_time').notNullable();
    })
  ])
};

exports.down = function(knex, Promise) {  
  return Promise.all([
    knex.schema.table('histories', function(table){
      table.dropColumn('speed_average');
    })
  ])
};