const mqtt = require('mqtt')
const NanoTimer = require('nanotimer')
const moment = require('moment')
const express = require('express')
const path = require('path')
const dns = require('dns')
const bodyParser = require('body-parser')
const wifi = require('node-wifi');


const config = {
  mqtt: {
    host: 'localhost',
    port: 1900,
  },
  api: {
    port: 9090    
  }
}

const client  = mqtt.connect(config.mqtt)

wifi.init({
    iface : null
});
 

const app = express()
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

let PORT = process.env.PORT || config.api.port
let server = app.listen(PORT, () => {
  console.log('Production Express server API running at localhost:' + PORT)
})

const io = require('socket.io').listen(server);

const timer = new NanoTimer()

let state = {
	uid: undefined,
	nGate: undefined,
	distances: [],
	phase: 0,
	isStarted: false,
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

function emitState(){
	let { time, phase } = state
	io.emit('state', Object.assign({}, state, { time, phase }))
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
    	state.time = timestamp.asMilliseconds()
		emitState()
    }, '', '1m')
}

function stopTimer(){
  	console.log('End')
  	client.publish('/TIMINGGATE', 'Reset')
  	console.log(state.results) //input to DB
	timer.clearInterval()
	let { uid, time } = state
	state.competitions.push({ uid, time })
	state = Object.assign({}, state, {
		uid: undefined,
		nGate: undefined,
		distances: [],
		phase: 0,
		isStarted: false,
		results: [],
		time: 0
	})
	emitState()
	emitCompetitions()
}

io.on('connect', function(socket) {
	emitState()
	emitCompetitions()
	checkInternet()
})

client.on('connect', () => {
	client.subscribe('/TIMINGGATE/TICKLE')
})
 
client.on('message', (topic, payload) => {
	let { isStarted, nGate, uid, distances, time } = state
	let msg = payload.toString()

	if(msg == '1' && nGate != 0 && uid != undefined && distances.length != 0){
		state.phase++
		if(!isStarted){
			startTimer()
		} else {
		  	state.results.push(time)  		
		  	if(state.results.length == nGate-1){
				stopTimer()
		  	}
		}
	} else {
		console.log('error')
	}
})

//--------------------------------------------------------------------------

//----------------------------- Api ------------------------------------------

app.route('/timers')
	.post((req, res) => {
		const { uid, nGate, distances } = req.body
		state.uid = uid
		state.nGate = nGate
		state.distances = distances
		emitState()
		res.send()
	})
	.delete((req, res) => {
		stopTimer()
		res.send()
	})

app.route('/competitions')
	.delete((req, res) => {
		state.competitions = []
		emitCompetitions()	
	})

app.route('/users')
	.get((req, res) => { res.send('getusers')})
	.post((req, res) => {
		console.log(req.body)
		res.send(req.body)
	})

app.route('/users/:id')
	.get((req, res) => {})
	.patch((req, res) => {})
	.delete((req, res) => {})

app.route('/histories')
	.get((req, res) => {})
	.post((req, res) => {})
	.delete((req, res) => {})

app.route('/histories/:id')
	.get((req, res) => {})
	.delete((req, res) => {})

app.route('/wifi')
	.get((req, res) => {
		wifi.scan(function(err, networks) {
		    if (err) {
		        console.log(err)
				res.send(err)
		    } else {
		        console.log(networks)
		        let ssid = networks.map((network) => network.ssid)
				res.send(ssid)
		    }
		})
	})
	.post((req, res) => {
		wifi.connect({ ssid : req.body.ssid, password : req.body.password}, (err) => {
		    if (err) {
		        console.log(err)
		    }
		    console.log('Connected')
		    res.send('Connected')
		})
	})
	.delete((req, res) => {
		wifi.disconnect((err) => {
		    if (err) {
		        console.log(err)
		    }
		    console.log('Disconnected')
		    res.send('Disconnected')
		})
	})

app.get('*', (req, res) => {
  res.send('ITimer API')
})

//--------------------------------------------------------------------------