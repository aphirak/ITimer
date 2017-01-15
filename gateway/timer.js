const mqtt = require('mqtt')
const NanoTimer = require('nanotimer')
const moment = require('moment')
const express = require('express')
const path = require('path')

const config = {
  mqtt: {
    host: '192.168.2.44',
    port: 1900,
  },
  api: {
    port: 9090    
  }
}

const client  = mqtt.connect(config.mqtt)
const timer = new NanoTimer()

let timestamp = 0
let result = []
let isStarted = false
let numberOfGate;

function startTimer(){
	console.log('Start')
  	isStarted = true
    timer.setInterval(() => {
		timestamp = moment.duration(timestamp + 1, 'milliseconds')
    }, '', '1m')
}

function endTimer(){
  	console.log('End')
  	console.log(result)
	timer.clearInterval()
  	isStarted = false
	timestamp = 0
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
				endTimer()
		  	}
		}
	} else {
		console.log('Please config number of gate')
	}
})

const app = express()

app.use(express.static(__dirname))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/timer/start', (req, res) => {
	numberOfGate = req.query.n
	res.send('ok')
})

app.get('/timer/stop', (req, res) => {
	endTimer()
	res.send('ok')
})

app.get('*', (req, res) => {
  res.send('ITimer API')
})

let PORT = process.env.PORT || config.api.port
app.listen(PORT, () => {
  console.log('Production Express server API running at localhost:' + PORT)
})

