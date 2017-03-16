import bookshelf from '../../bookshelf'

const History = bookshelf.Model.extend({
	tableName: 'histories',
	hasTimestamps: true
})

export default History