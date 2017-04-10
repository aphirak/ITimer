import bookshelf from 'root/bookshelf'
import { User, Detail } from 'src/models'

const History = bookshelf.Model.extend({
	tableName: 'histories',
	hasTimestamps: true,
	user: () => this.belongsTo(User),
	details: () => this.hasMany(Detail)
}, {
	dependents: ['details']
})

export default History
