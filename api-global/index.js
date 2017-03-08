import moment from 'moment'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import config from './config'
import {
	User,
	History,
	Detail
} from './models'
import {
	UserController,
	HistoryController
} from './controllers'
import {
	UserService,
	HistoryService,
	DetailService
} from './services'
import bookshelf from './bookshelf'

const app = express()

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

const PORT = process.env.PORT || config.api.port
const server = app.listen(PORT, () => {
  console.log('Production Express server API running at localhost:' + PORT)
})

app.route('/users')
	.get(UserController.getUsers)
	.post(UserController.postUser)

app.route('/users/:id')
	.get(UserController.getUserById)
	.patch(UserController.patchUserById)
	.delete(UserController.deleteUserById)

app.route('/users/:id/histories')
	.get(HistoryController.getHistoriesByUserId)
	.delete(HistoryController.deleteHistoriesByUserId)

app.route('/histories')
	.get(HistoryController.getHistories)

app.route('/histories/:id')
	.get(HistoryController.getHistoryById)
	.delete(HistoryController.deleteHistoryById)

app.route('/sync')
	.post((req, res) => {

		
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

		// User2.forge({ id: 3, username: 'asdasd', firstname: 'bbb' }).save(null, {method: 'insert'}).then((user) => {
		// 	console.log(user)
		// })




		// console.log(req.body)
		res.json('ok')
	})


app.get('*', (req, res) => {
  res.send('ITimer API Global')
})