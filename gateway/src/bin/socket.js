import SocketIO from 'socket.io'

import { emitTimer, emitCompetition } from 'src/utilities'

let io

let init = (server) => {
	io = new SocketIO(server)
	io.on('connect', (socket) => {
		emitTimer(socket)
		emitCompetition(socket)
		// socket.emit('aaa', '12321321412')
		socket.on('timer', (res) => {
			console.log(res)
			socket.emit('aaa', '24124214124')
		})
	})
}

export {
	init,
	io
}
