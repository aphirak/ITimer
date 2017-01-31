const bookshelf = require('../bookshelf')
const History = require('./history')

const Detail = bookshelf.Model.extend({
	tableName: 'details',
	hasTimestamps: true,
	history: function () {
		return this.belongsTo(History)
	}
})

module.exports = Detail