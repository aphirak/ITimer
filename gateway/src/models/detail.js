import bookshelf from 'root/bookshelf'
import { History } from 'src/models'

const Detail = bookshelf.Model.extend({
	tableName: 'details',
	hasTimestamps: true,
	history: function () {
		return this.belongsTo(History)
	}
})

export default Detail
