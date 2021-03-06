import SocketIO from 'socket.io'

import { emitTimer, emitCompetition } from 'src/utilities'

let io

let init = (server) => {
	io = new SocketIO(server)
	io.on('connection', (socket) => {
		emitTimer(socket)
		emitCompetition(socket)
	})
}

export {
	init,
	io
}
