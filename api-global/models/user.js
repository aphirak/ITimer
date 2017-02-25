import bookshelf from '../bookshelf'
import History from './history'

const User = bookshelf.Model.extend({
	tableName: 'users',
	hasTimestamps: false,
	histories: function () {
		return this.hasMany(History)
	}
},{
	dependents: ['histories']
})

export default User