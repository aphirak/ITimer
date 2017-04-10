import bookshelf from 'root/bookshelf'
import { History } from 'src/models'

const User = bookshelf.Model.extend({
	tableName: 'users',
	hasTimestamps: true,
	histories: function () {
		return this.hasMany(History)
	}
}, {
	dependents: ['histories']
})

export default User
