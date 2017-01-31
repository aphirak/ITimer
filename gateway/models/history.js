const bookshelf = require('../bookshelf')
const User = require('./user')
const Detail = require('./detail')

const History = bookshelf.Model.extend({
	tableName: 'histories',
	hasTimestamps: true,
	user: function () {
		return this.belongsTo(User)
	},
	details: function() {
		return this.hasMany(Detail)
	}
})


module.exports = History