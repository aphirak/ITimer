import bookshelf from '../bookshelf'
import History from './history'

const Detail = bookshelf.Model.extend({
	tableName: 'details',
	hasTimestamps: true,
	history: function () {
		return this.belongsTo(History)
	}
})

export default Detail