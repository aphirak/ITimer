import { Router } from 'express'

import {
	UserController,
	HistoryController,
	TimerController
} from 'src/controllers'

const router = Router()

router.route('/timers')
	.post(TimerController.postTimer)
	.delete(TimerController.deleteTimer)

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
