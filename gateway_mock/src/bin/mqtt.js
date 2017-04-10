import mqtt from 'mqtt'
import config from 'config'

let mqttConnection = {}
let client

mqttConnection.init = () => {
	client = mqtt.connect(config.Mqtt)
	client.on('connect', () => {
		client.subscribe('/TIMINGGATE/TRACKING')
		client.publish('/TIMINGGATE', 'SETUP')
	})

	client.on('message', (topic, payload) => {
		let msg = payload.toString()
		console.log(msg)
	})
}

export { client }
export default mqttConnection
