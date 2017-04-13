import { io } from 'src/bin/socket'
import { state } from 'src/parameters'
import { emitCompetitions, pubTimingGate } from 'src/utilities'

const emitTimer = (socket = io) => {
	socket.emit('timer', { ...state, competitions: undefined })
}

const stopTimer = () => {
	console.log('End')
	pubTimingGate('RESET')
	// console.log(state.results) // input to DB
	if (state.results.length !== 0) {
		// let { results, uid, nGate } = state
		// let total_distance = results.reduce((sum, value) => sum + (+value.distance), 0)
		// let total_time = results.reduce((sum, value) => sum + (+value.time), 0).toFixed(3)
		// let speed_average = ((+total_distance) / (+total_time)).toFixed(3)
		// insertHistory(total_distance, total_time, speed_average)
		// state.competitions.push({ uid, total_distance, total_time, speed_average })
		emitCompetitions()
	}
	// timer.clearInterval()
	// handleTimer.clearInterval()
	state.isStarted = false
	emitTimer()

	state.uid = undefined
	state.nGate = undefined
	state.distances = []
	state.gate = 0
	state.isSetup = false
	state.results = []
	state.time = 0
}

export {
	emitTimer,
	stopTimer
}
