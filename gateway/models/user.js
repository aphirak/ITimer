const bookshelf = require('../bookshelf')
const History = require('./history')

const User = bookshelf.Model.extend({
	tableName: 'users',
	hasTimestamps: true,
	histories: function () {
		return this.hasMany(History)
	}
})

module.exports = User