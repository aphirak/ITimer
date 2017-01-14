var mqtt = require('mqtt')

var options = {
	host: '192.168.2.44',
	port: 1900,
}

var client  = mqtt.connect(options)
 
client.on('connect', function () {
  client.subscribe('/TIMINGGATE/TICKLE')
  client.publish('/TIMINGGATE', 'Hello mqtt')
})
 
client.on('message', function (topic, message) {
  console.log(message.toString())
})