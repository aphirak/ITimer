const mqtt = require('mqtt')
const NanoTimer = require('nanotimer')
const moment = require('moment')
const timer = new NanoTimer()

const options = {
	host: '192.168.2.44',
	port: 1900,
}
const client  = mqtt.connect(options)
let timestamp = 0
let result = []
let isStart = false

function countUp(){
	timestamp = moment.duration(timestamp + 1, 'milliseconds')
}

client.on('connect', () => {
  client.subscribe('/TIMINGGATE/TICKLE')
  client.publish('/TIMINGGATE', 'Hello mqtt')
})


 
client.on('message', (topic, payload) => {
  let msg = payload.toString()
  if(!isStart){
  	console.log('Start')
  	isStart = true
    timer.setInterval(countUp, '', '1m')
  } else if(msg == "1"){
	  	result.push(timestamp.asMilliseconds())  		
	  	if(result.length == 4){
		  	console.log('End')
			console.log(result)
			timer.clearInterval()
		  	isStart = false
			timestamp = 0
			result = []
	  	}
	}
})

