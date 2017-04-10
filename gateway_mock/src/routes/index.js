import { Router } from 'express'

import {
	UserController,
	HistoryController
} from 'src/controllers'
import { state } from 'src/parameters'
import { client } from 'src/bin/mqtt'

const router = Router()

router.route('/timers')
	.post((req, res) => {
		const { uid, nGate, distances } = req.body
		if (!state.isStarted && uid !== undefined && nGate >= 2 && distances.length === nGate - 1) {
			state.uid = uid
			state.nGate = nGate
			state.distances = distances
			state.isSetup = true
			client.publish('/TIMINGGATE', 'SETUP')
			// emitTimer()
			res.send(state)
		} else {
			res.sendStatus(400)
		}
	})
	.delete((req, res) => {
		// stopTimer()
		res.send('ok')
	})

// app.route('/competitions')
// 	.delete((req, res) => {
// 		state.competitions = []
// 		emitCompetitions()
// 	})

router.route('/users')
	.get(UserController.getUsers)
	.post(UserController.postUser)

router.route('/users/:id')
	.get(UserController.getUserById)
	.patch(UserController.patchUserById)
	.delete(UserController.deleteUserById)

router.route('/users/:id/histories')
	.get(HistoryController.getHistoriesByUserId)
	.delete(HistoryController.deleteHistoriesByUserId)

router.route('/histories')
	.get(HistoryController.getHistories)

router.route('/histories/:id')
	.get(HistoryController.getHistoryById)
	.delete(HistoryController.deleteHistoryById)

// router.route('*')
// 	.get((req, res) => {
// 		console.log(state.x)
// 		res.send(state.x)
// 	})

export default router
