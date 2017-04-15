import mqtt from 'mqtt'
import config from 'config'

import { trackingTimer } from 'src/utilities'

let client

const topicSub = '/TIMINGGATE/TRACKING'

const init = () => {
	client = mqtt.connect(config.Mqtt)
	client.on('connect', () => {
		client.subscribe(topicSub)
	})

	client.on('message', (topic, payload) => {
		let msg = payload.toString()
		let msgJson = JSON.parse(msg)
		switch (msgJson.type) {
			case 'status':
				console.log(msgJson.payload)
				break
			case 'tracking':
				trackingTimer(msgJson)
				break
			default:
				console.log('Error: Unknow Type')
				break
		}
	})
}

export {
	init,
	client
}
