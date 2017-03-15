import mqtt from 'mqtt'
import config from 'config'
import moment from 'moment'

let mqttConnection = {}
let results = []

mqttConnection.init = () => {
	const client  = mqtt.connect(config.Mqtt)

	client.publish('/TIMINGGATE', "RESET")
	client.publish('/TIMINGGATE', "SETUP")

	client.on('connect', () => {
		client.subscribe('/TIMINGGATE/TRACKING')
	})
	 
	client.on('message', (topic, payload) => {
		// let { isStarted, isSetup, nGate, uid, distances, time } = state
		let msg = payload.toString()
		
		// console.log(msg)
		let time = msg/1000
		results.push(time)
		console.log(results)
		if(results.length == 2){
			client.publish('/TIMINGGATE', "RESET")
			client.publish('/TIMINGGATE', "SETUP")
			console.log(`Time: ${(results[1]-results[0]).toFixed(3)} s`)
			results = []
		}
		// if(msg == '1' && isSetup){
		// 	++state.gate
		// 	if(!isStarted){
		// 	  	state.isStarted = true
		// 	  	prevTime = state.time
		// 	  	emitTimer()
		// 		startTimer()
		// 	} else {
		// 		let currentTime = state.time
		// 		let timeResult = (currentTime - prevTime).toFixed(3)
		// 		let distanceResult = state.distances[state.gate-2]
		// 	  	state.results.push({
		// 	  		phase: state.gate-1,
		// 	  		time: timeResult,
		// 	  		distance: distanceResult,
		// 	  		speed: (distanceResult/timeResult).toFixed(3)
		// 	  	})
		// 	  	prevTime = currentTime
		// 		emitTimer()
		// 	  	if(state.results.length == nGate-1){
		// 			stopTimer()
		// 	  	}
		// 	}
		// } else {
		// 	console.log('error')
		// }
	})
}

export default mqttConnection