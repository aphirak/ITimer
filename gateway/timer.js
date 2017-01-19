const mqtt = require('mqtt')
const NanoTimer = require('nanotimer')
const moment = require('moment')
const express = require('express')
const path = require('path')
const dns = require('dns')

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
const timer = new NanoTimer()
const handleTimer = new NanoTimer()

let timestamp = moment.duration(0, 'milliseconds')
let result = []
let isStarted = false
let numberOfGate;

//----------------------------- Mqtt ------------------------------------------

function startTimer(){
	console.log('Start')
  	isStarted = true
    timer.setInterval(() => {
		timestamp = moment.duration(timestamp + 1, 'milliseconds')
    }, '', '1m')
}

function stopTimer(){
  	console.log('End')
  	console.log(result)
	timer.clearInterval()
	handleTimer.clearInterval()
  	isStarted = false
	timestamp = moment.duration(0, 'milliseconds')
	numberOfGate = undefined
	result = []
}

client.on('connect', () => {
  client.subscribe('/TIMINGGATE/TICKLE')
})
 
client.on('message', (topic, payload) => {
	if(numberOfGate != undefined){
		let msg = payload.toString()
		if(!isStarted){
			startTimer()
		} else if(msg == "1"){
		  	result.push(timestamp.asMilliseconds())  		
		  	if(result.length == numberOfGate-1){
				stopTimer()
		  	}
		}
	} else {
		console.log('Please config number of gate')
	}
})

//--------------------------------------------------------------------------

//----------------------------- Api ------------------------------------------

const app = express()
const expressWs = require('express-ws')(app)

app.use(express.static(__dirname))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.ws('/timer', function(ws, req, next) {
    ws.on('close', function() {
    	handleTimer.clearInterval()
        console.log('The connection was closed!')
    })

	handleTimer.setInterval(() => {
		ws.send({
			time: timestamp.hours() + ":" + timestamp.minutes() + ":" + timestamp.seconds() + ":" + timestamp.milliseconds(),
			phase: 1
		})
	}, '', '1m')
})

app.post('/timer/setup', (req, res) => {
	// uid, nGate, distnace = []
	res.send('ok')
})

app.get('/timer/start', (req, res) => {

})

app.get('/timer/stop', (req, res) => {
	stopTimer()
	res.send('ok')
})

app.ws('/connection', function(ws, req, next) {
    ws.on('close', function() {
    	handleTimer.clearInterval()
        console.log('The connection was closed!')
    })

	setInterval(() => {
		dns.resolve('www.google.com', function(err) {
			if (err) {
				ws.send("No connection")
				console.log("No connection")
			} else {
				ws.send("Connected")
				console.log("Connected")
			}
		})
	}, 3000)
})

app.get('/competition', (req, res) => {})

app.get('/users', (req, res) => {})

app.get('/users/:id', (req, res) => {})

app.post('/users', (req, res) => {})

app.patch('/users/:id', (req, res) => {})

app.delete('/users/:id', (req, res) => {})

app.get('/histories', (req, res) => {})

app.get('/histories/:id', (req, res) => {})

app.post('/histories', (req, res) => {})

app.delete('/histories', (req, res) => {})

app.delete('/histories/:id', (req, res) => {})


app.get('*', (req, res) => {
  res.send('ITimer API')
})

//--------------------------------------------------------------------------


let PORT = process.env.PORT || config.api.port
app.listen(PORT, () => {
  console.log('Production Express server API running at localhost:' + PORT)
})
