import bookshelf from 'root/bookshelf'
import {
	User,
	History,
	Detail
} from 'src/models'

const postSync = (req, res) => {
	bookshelf.knex('users').del().then(() => {
		req.body.users.map((value) => {
			delete value.updated_at
			User.forge(value).save(null, {method: 'insert'}).then((user) => {
				console.log('user ok')
			})
		})
	})

	bookshelf.knex('histories').del().then(() => {
		req.body.histories.map((value) => {
			delete value.updated_at
			History.forge(value).save(null, {method: 'insert'}).then((history) => {
				console.log('History ok')
			})
		})
	})

	bookshelf.knex('details').del().then(() => {
		req.body.details.map((value) => {
			delete value.updated_at
			Detail.forge(value).save(null, {method: 'insert'}).then((detail) => {
				console.log('detail ok')
			})
		})
	})
	res.json('ok')
}

export {
	postSync
}
