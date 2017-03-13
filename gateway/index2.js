import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import http from 'http';
import socketIO from 'socket.io'
import compression from 'compression'
import config from './config'
import test from './routes/test'

const port = process.env.PORT || config.api.port
const app = express()
const server = http.Server(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header('Access-Control-Allow-Methods', "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})

app.use('/test', test)

app.get("*", (req, res) => {
	res.send('ITimer API')
})

server.listen(port, () => {
  console.log('Production Express server API running at localhost:' + port)
})


// const server = app.listen(PORT, () => {
//   console.log('Production Express server API running at localhost:' + PORT)
// })

