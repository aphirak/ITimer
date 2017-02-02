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

export {
	getHistories,
	getHistoryById,
	deleteHistoryById
}