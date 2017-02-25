import bookshelf from '../bookshelf'
import User from './user'
import Detail from './detail'

const History = bookshelf.Model.extend({
	tableName: 'histories',
	hasTimestamps: false,
	user: function () {
		return this.belongsTo(User)
	},
	details: function() {
		return this.hasMany(Detail)
	}
}, {
	dependents: ['details']
})


export default History