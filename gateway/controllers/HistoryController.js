import {
	User,
	History
} from '../models'
import {
	HistoryService
} from '../services'

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
	User.forge({ id }).fetch({ withRelated: ['histories'] }).then((user) => {
		res.json(user.toJSON().histories)
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