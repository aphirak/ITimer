import SocketIO from 'socket.io'

import { state } from 'src/parameters'

let sockets = {}
let io

sockets.init = (server) => {
	io = new SocketIO(server)
	io.on('connect', (socket) => {
		let { gate, isStarted, isSetup, results, time, uid, nGate, distances, competitions } = state
		socket.emit('timer', {
			gate,
			isSetup,
			results,
			time,
			isStarted,
			uid,
			nGate,
			distances
		})
		socket.emit('competitions', competitions)
	})
}

export { io }
export default sockets
