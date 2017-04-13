import SocketIO from 'socket.io'

import { emitTimer, emitCompetition } from 'src/utilities'

let sockets = {}
let io

sockets.init = (server) => {
	io = new SocketIO(server)
	io.on('connect', (socket) => {
		emitTimer(socket)
		emitCompetition(socket)
	})
}

export { io }
export default sockets
