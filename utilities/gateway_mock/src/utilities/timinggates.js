import { client } from 'src/bin/mqtt'
import { io } from 'src/bin/socket'
import { state } from 'src/parameters'

const topibPub = '/TIMINGGATE'

const pubTimingGates = (message) => {
	client.publish(topibPub, message)
}

const emitTimingGate = (socket = io) => {
	socket.emit('timinggates', state.timinggates)
}

const handleTimingGate = (msgJson) => {
	state.timinggates.push(msgJson.id)
	state.timinggates.sort()
	emitTimingGate()
}

export {
    pubTimingGates,
	emitTimingGate,
	handleTimingGate
}
