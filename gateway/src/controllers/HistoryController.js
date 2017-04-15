import {
	User,
	History
} from 'src/models'
import {
	HistoryService
} from 'src/services'

const getHistories = (req, res) => {
	HistoryService.getHistories().then((histories) => {
		res.json(histories)
	})
}

const getHistoryById = (req, res) => {
	let { id } = req.params
	History.forge({ id }).fetch({ withRelated: ['details'] }).then((history) => {
		res.json(history)
	})
}

const deleteHistoryById = (req, res) => {
	let { id } = req.params
	History.forge({ id }).destroy().then((history) => {
		res.sendStatus(200)
	})
}

const getHistoriesByUserId = (req, res) => {
	let { id } = req.params
	User.forge({ id }).fetch({ withRelated: ['histories.details'] }).then((user) => {
		let histories = user.toJSON().histories
		histories.sort((a, b) => (b.created_at - a.created_at))
		res.json(histories)
	})
}

const deleteHistoriesByUserId = (req, res) => {
	let { id } = req.params
	User.forge({ id }).fetch({ withRelated: ['histories'] }).then((user) => {
		user.toJSON().histories.map((history) => {
			History.forge({ id: history.id }).destroy().then(() => {
				res.sendStatus(200)
			})
		})
	})
}

export {
	getHistories,
	getHistoryById,
	deleteHistoryById,
	getHistoriesByUserId,
	deleteHistoriesByUserId
}
