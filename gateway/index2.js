import mqtt from 'mqtt'
import NanoTimer from 'nanotimer'
import moment from 'moment'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import config from './config'
import bookshelf from './bookshelf'
import {
	User,
	History,
	Detail
} from './models'

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

let prevTime = 0

let state = {
	uid: undefined,
	nGate: undefined,
	distances: [],
	gate: 0,
	isStarted: false,
	isSetup: false,
	results: [],
	time: 0,
	competitions: [{uid: 1000, time: 123}]
}

//----------------------------- ORM ------------------------------------------

function insertHistory(){
	// let results = [{phase: 1, distance: 100, time: 1.125, speed: 88.889 }, {phase: 2, distance: 200, time: 1.5, speed: 133.333 }]
	let { results, uid, nGate } = state
	let total_distance = results.reduce((sum,value) => sum + (+value.distance), 0)
	let total_time = results.reduce((sum,value) => sum + (+value.time), 0).toFixed(3)
	let speedAverage = ((+total_distance)/(+total_time)).toFixed(3)
	new History({ 
		user_id: uid, 
		total_gate: nGate, 
		total_distance, 
		total_time, 
		speed_average: speedAverage 
	}).save().then((author) => {
		results.map((result) => {
			new Detail({ 
				history_id: author.attributes.id,
				...result 
			}).save()		
		})
	})
}

//-------------------------------------------------------------------------------

//----------------------------- Socket ------------------------------------------

function emitTimer(){
	let { gate, isStarted, isSetup, results, time, uid, nGate, distances } = state
	io.emit('timer', {
		gate,
		isSetup,
		results,
		time,
		isStarted,
		uid,
		nGate,
		distances
	})
}

function emitCompetitions(){
	io.emit('competitions', state.competitions)	
}

function startTimer(){
	console.log('Start')
	let timestamp = moment.duration(0, 'milliseconds')
    timer.setInterval(() => {
    	timestamp = moment.duration(timestamp + 1, 'milliseconds')
    	state.time = timestamp.asSeconds().toFixed(3)
    }, '', '1m')
    handleTimer.setInterval(emitTimer, '', '9m')
}

function stopTimer(){
  	console.log('End')
  	client.publish('/gate', 'RESET')
  	console.log(state.results) //input to DB
  	insertHistory()
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
		gate: 0,
		isStarted: false,
		isSetup: false,
		results: [],
		time: 0
	}
}

io.on('connect', function(socket) {
	// console.log('eieiza')
	let { gate, isStarted, isSetup, results, time, uid, nGate, distances } = state
	socket.emit('timer', { 
		gate,
		isSetup,
		results,
		time,
		isStarted,
		uid,
		nGate,
		distances
	})
	// socket.emit('competitions', competitions)
	// checkInternet()
	// socket.on('competitions', function(data) {
	// 	socket.emit('competitions', competitions)
	// })
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
		state.gate++
		if(!isStarted){
		  	state.isStarted = true
		  	prevTime = state.time
		  	emitTimer()
			startTimer()
		} else {
			let currentTime = state.time
			let timeResult = (currentTime - prevTime).toFixed(3)
			let distanceResult = state.distances[state.gate-2]
		  	state.results.push({
		  		phase: state.gate-1,
		  		time: timeResult,
		  		distance: distanceResult,
		  		speed: (distanceResult/timeResult).toFixed(3)
		  	})
		  	prevTime = currentTime
		  	if(state.results.length == nGate-1){
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
		if(!state.isStarted && uid != undefined && nGate >= 2 && distances.length == nGate-1){
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
































