import { io } from 'src/bin/socket'
import { state } from 'src/parameters'

const emitTimer = (socket = io) => {
	socket.emit('timer', { ...state, competitions: undefined })
}

export {
	emitTimer
}
