import { io } from 'src/bin/socket'
import { state } from 'src/parameters'

const emitCompetition = (socket = io) => {
	socket.emit('competitions', state.competitions)
}

export {
    emitCompetition
}
