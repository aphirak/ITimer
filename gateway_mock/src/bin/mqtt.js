import mqtt from 'mqtt'
import config from 'config'

let client

const topicSub = '/TIMINGGATE/TRACKING'

const init = () => {
	client = mqtt.connect(config.Mqtt)
	client.on('connect', () => {
		client.subscribe(topicSub)
	})

	client.on('message', (topic, payload) => {
		let msg = payload.toString()
		console.log(msg)
	})
}

export {
	init,
	client
}
