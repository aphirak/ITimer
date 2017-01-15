var mqtt = require('mqtt')
var NanoTimer = require('nanotimer')
var moment = require('moment')
var timer = new NanoTimer()
let y = moment.duration(0, 'milliseconds')
let x = []

var options = {
	host: '192.168.2.44',
	port: 1900,
}

var client  = mqtt.connect(options)
 
function countDown(){
	y = moment.duration(y + 1, 'milliseconds')
	// console.log(y.hours() + ":" + y.minutes() + ":" + y.seconds() + ":" + y.milliseconds())
}

client.on('connect', function () {
  client.subscribe('/TIMINGGATE/TICKLE')
  client.publish('/TIMINGGATE', 'Hello mqtt')
})
 
client.on('message', function (topic, message) {
  console.log(message.toString())
  if(message.toString() == "start"){
    timer.setInterval(countDown, '', '1m');
  }
  else if(message.toString() == "1"){
  	let z = y.hours() + ":" + y.minutes() + ":" + y.seconds() + ":" + y.milliseconds()
  	x.push(z)
  	console.log(z)
  }
  console.log(x)
})

