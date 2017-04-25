import bookshelf from 'root/bookshelf'
import { User, Detail } from 'src/models'

const History = bookshelf.Model.extend({
	tableName: 'histories',
	hasTimestamps: true,
	user: function () {
		return this.belongsTo(User)
	},
	details: function () {
		return this.hasMany(Detail)
	}
}, {
	dependents: ['details']
})

export default History
