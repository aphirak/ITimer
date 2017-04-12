import SocketIO from 'socket.io'

import { state } from 'src/parameters'

let sockets = {}
let io

sockets.init = (server) => {
	io = new SocketIO(server)
	io.on('connect', (socket) => {
		socket.emit('timer', { ...state, competitions: undefined })
		socket.emit('competitions', state.competition)
	})
}

export { io }
export default sockets
