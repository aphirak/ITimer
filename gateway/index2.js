import mqtt from 'mqtt'
import NanoTimer from 'nanotimer'
import moment from 'moment'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import config from './config'

const client  = mqtt.connect(config.mqtt)
const app = express()
const timer = new NanoTimer()
const handleTimer = new NanoTimer()

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

const io = require('socket.io').listen(server)

let state = {
	uid: undefined,
	nGate: undefined,
	distances: [],
	phase: 0,
	isStarted: false,
	isSetup: false,
	results: [],
	time: 0,
	competitions: [{uid: 1000, time: 123}]
}

let users = [
	{
		id: 1,
		student_id: 1001,
		firstname: 'a',
		lastname: 'a2',
		nickname: 'a3'
	},{
		id: 2,
		student_id: 1002,
		firstname: 'b',
		lastname: 'b2',
		nickname: 'b3'
	},{
		id: 3,
		student_id: 1003,
		firstname: 'c',
		lastname: 'c2',
		nickname: 'c3'
	}
]

let histories = [

]

//----------------------------- Socket ------------------------------------------

function emitTimer(){
	let { phase, isStarted, isSetup, results, time } = state
	io.emit('timer', {
		phase,
		isSetup,
		results,
		time,
		isStarted
	})
}

function emitCompetitions(){
	io.emit('competitions', state.competitions)	
}

function startTimer(){
	console.log('Start')
  	state.isStarted = true
	let timestamp = moment.duration(0, 'milliseconds')
    timer.setInterval(() => {
    	timestamp = moment.duration(timestamp + 1, 'milliseconds')
    	state.time = timestamp.asSeconds()
    }, '', '1m')
    handleTimer.setInterval(emitTimer, '', '9m')
}

function stopTimer(){
  	console.log('End')
  	client.publish('/TIMINGGATE', 'RESET')
  	console.log(state.results) //input to DB
	timer.clearInterval()
	handleTimer.clearInterval()
	state.isStarted = false
  	emitTimer()
	let { uid, time, distances } = state
	state.competitions.push({ uid, time, distances })
	emitCompetitions()
	state = { 
		...state,
		uid: undefined,
		nGate: undefined,
		distances: [],
		phase: 0,
		isStarted: false,
		isSetup: false,
		results: [],
		time: 0
	}
	// emitState()
}

io.on('connect', function(socket) {
	let { phase, isStarted, isSetup, results, time, competitions } = state
	socket.emit('timer', { phase, isSetup, results, time, isStarted })
	// socket.emit('competitions', competitions)
	// checkInternet()
	socket.on('competitions', function(data) {
		socket.emit('competitions', competitions)
	})
})

// io.on('competitions', function(data) {
	// console.log(data)
	// let { phase, isStarted, isSetup, results, time, competitions } = state
	// socket.emit('timer', { phase, isSetup, results, time, isStarted })
	// socket.emit('competitions', competitions)
	// checkInternet()
// })

client.on('connect', () => {
	client.subscribe('/TIMINGGATE/TRACKING')
})
 
client.on('message', (topic, payload) => {
	let { isStarted, isSetup, nGate, uid, distances, time } = state
	let msg = payload.toString()
	
	console.log(msg)

	if(msg == '1' && isSetup){
		state.phase++
		if(!isStarted){
			startTimer()
		} else {
			console.log(time)
		  	state.results.push(time)  		
		  	if(state.results.length == nGate-1){
				state.phase--
				stopTimer()
		  	}
		}
	} else {
		console.log('error')
	}
})

//-------------------------------------------------------------------------------
//------------------------------ Api --------------------------------------------

app.route('/timers')
	.post((req, res) => {
		const { uid, nGate, distances } = req.body
		if(!state.isSetup && uid != undefined && nGate >= 2 && distances.length == nGate-1){
			state.uid = uid
			state.nGate = nGate
			state.distances = distances
			state.isSetup = true
		  	client.publish('/TIMINGGATE', 'SETUP')
		  	emitTimer()
			res.send(state)
		} else {
			res.sendStatus(400)
		}
	})
	.delete((req, res) => {
		stopTimer()
		res.send('ok')
	})

app.route('/competitions')
	.delete((req, res) => {
		state.competitions = []
		emitCompetitions()	
	})


app.get('*', (req, res) => {
  res.send('ITimer API')
})

//-------------------------------------------------------------------------------
































