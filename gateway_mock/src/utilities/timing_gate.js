import { client } from 'src/bin/mqtt'

const topibPub = '/TIMINGGATE'

const pubTimingGate = (message) => {
	client.publish(topibPub, message)
}

export {
    pubTimingGate
}
