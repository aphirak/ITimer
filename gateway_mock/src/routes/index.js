import { Router } from 'express'

import {
	UserController,
	HistoryController
} from 'src/controllers'

const router = Router()

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

router.route('*')
	.get((req, res) => {
		res.send('ITimer API')
	})

export default router
