import { io } from 'src/bin/socket'
import { state } from 'src/parameters'
import { emitCompetition, pubTimingGates, insertHistory } from 'src/utilities'

let prevTimeTracking, prevTimingGate

const emitTimer = (socket = io) => {
	socket.emit('timer', {
		...state,
		competitions: undefined,
		timinggates: undefined
	})
}

const stopTimer = () => {
	console.log('------------------End---------------------')
	pubTimingGates('RESET')
	console.log('Result', state.results)
	let { results, uid, time } = state
	if (results.length !== 0) {
		let total_distance = +results.reduce((sum, value) => sum + (+value.distance), 0).toFixed(3)
		let total_time = time
		let speed_average = +(total_distance / total_time).toFixed(3)
		insertHistory(total_distance, total_time, speed_average)
		state.competitions.push({ uid, total_distance, total_time, speed_average })
		state.competitions.sort((a, b) => (a.total_time - b.total_time))
		emitCompetition()
	}
	state.isStarted = false
	emitTimer()

	state.uid = undefined
	state.nPhase = undefined
	state.distances = []
	state.isSetup = false
	state.results = []
	state.time = 0
	state.phase = 0
}

const trackingTimer = (msgJson) => {
	let { isStarted, isSetup, nPhase, distances, mode } = state
	let timeTracking = msgJson.payload / 1000
	console.log(state.results)
	if (!isNaN(timeTracking) && isSetup) {
		if (!isStarted) {
			state.isStarted = true
		} else {
			++state.phase
			let distance = distances[prevTimingGate - 1][msgJson.id - 1]
			let time = +(timeTracking - prevTimeTracking).toFixed(3)
			let speed = +(distance / time).toFixed(3)
			state.results.push({
				phase: state.phase,
				time,
				distance,
				speed
			})
			state.time = +state.results.reduce((sum, value) => sum + (+value.time), 0).toFixed(3)
		}
		prevTimeTracking = timeTracking
		prevTimingGate = msgJson.id
		emitTimer()
		pubTimingGates('AGAIN')
		if (mode !== 'nonstop' && state.results.length >= nPhase) {
			stopTimer()
		}
	}
}

export {
	emitTimer,
	stopTimer,
	trackingTimer
}
