import mqtt from 'mqtt'
import NanoTimer from 'nanotimer'
import moment from 'moment'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import axios from 'axios'
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
import { wifi } from './routes'

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
	competitions: [{ uid: 3, total_distance: 100, total_time: 200, speed_average: 0.5 }]
}


function checkInternet(){
	setInterval(() => {
		dns.resolve('www.google.com', (err) => {
			if (err) {
				io.emit('connectInternet', 'not ok')
				console.log("No connection")
			} else {
				io.emit('connectInternet', 'ok')
				console.log("Connected")
			}
		})
	}, 3000)
}

function syncGlobal(){
	let p1 = UserService.getUsers().then(users => users)

	let p2 = HistoryService.getHistories().then(histories => histories)

	let p3 = DetailService.getDetails().then(details => details)

	Promise.all([ p1, p2, p3 ]).then((values) => {
		let results = {
			users: values[0],
			histories: values[1],
			details: values[2]
		}
		return results
	}).then((data) => {
		axios.post(`${config.apiGlobal.host}:${config.apiGlobal.port}/sync`, data)
			.then((response) => {
				console.log(response.data)
			})
			.catch((error) => {
				console.log(error)
			    if (error.response) {
			      console.log(error.response.data);
			      console.log(error.response.status);
			      console.log(error.response.headers);
			    }
			})
	})
}

// syncGlobal()

//----------------------------- ORM ------------------------------------------

function insertHistory(total_distance, total_time, speed_average){
	let { uid, nGate, results } = state
	HistoryService.postHistory(uid, nGate, results, total_distance, total_time, speed_average)
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
  	client.publish('/TIMINGGATE', 'RESET')
  	console.log(state.results) //input to DB
  	if(state.results.length != 0){
		let { results, uid, nGate } = state
		let total_distance = results.reduce((sum,value) => sum + (+value.distance), 0)
		let total_time = results.reduce((sum,value) => sum + (+value.time), 0).toFixed(3)
		let speed_average = ((+total_distance)/(+total_time)).toFixed(3)
	  	insertHistory(total_distance, total_time, speed_average)  
		state.competitions.push({ uid, total_distance, total_time, speed_average })
		emitCompetitions()
	  }
	timer.clearInterval()
	handleTimer.clearInterval()
	state.isStarted = false
  	emitTimer()
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
	let { gate, isStarted, isSetup, results, time, uid, nGate, distances, competitions } = state
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
	socket.emit('competitions', competitions)
	// checkInternet()
})

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

app.use('/wifi', wifi);

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

// app.route('/wifi')
// 	.get((req, res) => {
// 		wifi.scan(function(err, networks) {
// 		    if (err) {
// 		        console.log(err)
// 				res.send(err)
// 		    } else {
// 		        console.log(networks)
// 		        let ssid = networks.map((network) => network.ssid)
// 				res.send(ssid)
// 		    }
// 		})
// 	})
// 	.post((req, res) => {
// 		wifi.connect({ ssid : req.body.ssid, password : req.body.password}, (err) => {
// 		    if (err) {
// 		        console.log(err)
// 		    }
// 		    console.log('Connected')
// 		    res.send('Connected')
// 		})
// 	})
// 	.delete((req, res) => {
// 		wifi.disconnect((err) => {
// 		    if (err) {
// 		        console.log(err)
// 		    }
// 		    console.log('Disconnected')
// 		    res.send('Disconnected')
// 		})
// 	})

app.get('*', (req, res) => {
  res.send('ITimer API')
})

//-------------------------------------------------------------------------------
































