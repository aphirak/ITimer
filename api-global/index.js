import moment from 'moment'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import config from './config'

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


app.route('/sync')
	.post((req, res) => {
		console.log(req.body)
		res.json(req.body)
	})