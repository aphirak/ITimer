const dbConfig = require('./knexfile').development
const knex = require('knex')(dbConfig)
const bookshelf = require('bookshelf')(knex)
const cascadeDelete = require('bookshelf-cascade-delete')

bookshelf.plugin(cascadeDelete);


module.exports = bookshelf